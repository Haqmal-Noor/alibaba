import express from 'express';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateCategory } from '../middleware/validation.js';

const router = express.Router();

// GET /api/categories - Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true })
      .sort('name')
      .lean();

    // Get product count for each category
    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const productCount = await Product.countDocuments({ 
          categoryId: category._id,
          isActive: true 
        });
        
        return {
          ...category,
          id: category._id.toString(),
          productCount
        };
      })
    );

    res.json({ success: true, data: categoriesWithCount });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/categories/:id - Get single category
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    const transformedCategory = {
      ...category.toObject(),
      id: category._id.toString()
    };

    res.json({ success: true, data: transformedCategory });
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/categories - Create new category (Admin only)
router.post('/', authenticateToken, validateCategory, async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();

    const transformedCategory = {
      ...category.toObject(),
      id: category._id.toString(),
      productCount: 0
    };

    res.status(201).json({ success: true, data: transformedCategory });
  } catch (error) {
    console.error('Error creating category:', error);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ success: false, errors });
    }
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: 'Category with this name already exists' 
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/categories/:id - Update category (Admin only)
router.put('/:id', authenticateToken, validateCategory, async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    const productCount = await Product.countDocuments({ 
      categoryId: category._id,
      isActive: true 
    });

    const transformedCategory = {
      ...category.toObject(),
      id: category._id.toString(),
      productCount
    };

    res.json({ success: true, data: transformedCategory });
  } catch (error) {
    console.error('Error updating category:', error);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ success: false, errors });
    }
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: 'Category with this name already exists' 
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/categories/:id - Delete category (Admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    // Check if category has products
    const productCount = await Product.countDocuments({ 
      categoryId: req.params.id,
      isActive: true 
    });
    
    if (productCount > 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cannot delete category with associated products' 
      });
    }

    const category = await Category.findByIdAndDelete(req.params.id);
    
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;