import express from 'express';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import { authenticateToken } from '../middleware/auth.js';
import { validateProduct } from '../middleware/validation.js';

const router = express.Router();

// GET /api/products - Get all products with optional filtering
router.get('/', async (req, res) => {
  try {
    const { category, search, page = 1, limit = 12, sort = '-createdAt' } = req.query;
    
    // Build query
    const query = { isActive: true };
    
    // Category filter
    if (category && category !== 'all') {
      if (category.match(/^[0-9a-fA-F]{24}$/)) {
        // ObjectId format
        query.categoryId = category;
      } else {
        // Category name - find category first
        const categoryDoc = await Category.findOne({ 
          $or: [
            { name: new RegExp(category, 'i') },
            { slug: category.toLowerCase() }
          ]
        });
        if (categoryDoc) {
          query.categoryId = categoryDoc._id;
        }
      }
    }

    // Search functionality
    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') }
      ];
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Execute query with population
    const products = await Product.find(query)
      .populate('categoryId', 'name description slug')
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .lean();

    // Get total count for pagination
    const total = await Product.countDocuments(query);

    // Transform data for frontend compatibility
    const transformedProducts = products.map(product => ({
      ...product,
      id: product._id.toString(),
      category: product.categoryId ? {
        id: product.categoryId._id.toString(),
        name: product.categoryId.name,
        description: product.categoryId.description,
        slug: product.categoryId.slug
      } : { name: 'Uncategorized' }
    }));

    res.json({
      success: true,
      data: transformedProducts,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/products/:id - Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('categoryId', 'name description slug');
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Transform data for frontend compatibility
    const transformedProduct = {
      ...product.toObject(),
      id: product._id.toString(),
      category: product.categoryId ? {
        id: product.categoryId._id.toString(),
        name: product.categoryId.name,
        description: product.categoryId.description,
        slug: product.categoryId.slug
      } : { name: 'Uncategorized' }
    };

    res.json({ success: true, data: transformedProduct });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/products - Create new product (Admin only)
router.post('/', authenticateToken, validateProduct, async (req, res) => {
  try {
    // Verify category exists
    const category = await Category.findById(req.body.categoryId);
    if (!category) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid category selected' 
      });
    }

    const product = new Product(req.body);
    await product.save();
    
    // Populate category for response
    await product.populate('categoryId', 'name description slug');

    const transformedProduct = {
      ...product.toObject(),
      id: product._id.toString(),
      category: {
        id: product.categoryId._id.toString(),
        name: product.categoryId.name,
        description: product.categoryId.description,
        slug: product.categoryId.slug
      }
    };

    res.status(201).json({ success: true, data: transformedProduct });
  } catch (error) {
    console.error('Error creating product:', error);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ success: false, errors });
    }
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/products/:id - Update product (Admin only)
router.put('/:id', authenticateToken, validateProduct, async (req, res) => {
  try {
    // Verify category exists
    const category = await Category.findById(req.body.categoryId);
    if (!category) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid category selected' 
      });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('categoryId', 'name description slug');
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const transformedProduct = {
      ...product.toObject(),
      id: product._id.toString(),
      category: {
        id: product.categoryId._id.toString(),
        name: product.categoryId.name,
        description: product.categoryId.description,
        slug: product.categoryId.slug
      }
    };

    res.json({ success: true, data: transformedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ success: false, errors });
    }
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/products/:id - Delete product (Admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;