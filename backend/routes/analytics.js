import express from 'express';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Click from '../models/Click.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET /api/analytics/dashboard - Get dashboard analytics (Admin only)
router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    // Basic statistics
    const [totalProducts, totalCategories, totalClicks] = await Promise.all([
      Product.countDocuments({ isActive: true }),
      Category.countDocuments({ isActive: true }),
      Click.countDocuments()
    ]);

    // Top products by clicks
    const topProducts = await Product.find({ isActive: true })
      .sort({ clickCount: -1 })
      .limit(5)
      .select('title clickCount')
      .lean();

    const transformedTopProducts = topProducts.map(product => ({
      id: product._id.toString(),
      title: product.title,
      clickCount: product.clickCount || 0
    }));

    // Clicks by day (last 7 days)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      return date;
    }).reverse();

    const clicksByDay = await Promise.all(
      last7Days.map(async (date) => {
        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);
        
        const clicks = await Click.countDocuments({
          createdAt: {
            $gte: date,
            $lt: nextDay
          }
        });
        
        return {
          date: date.toISOString().split('T')[0],
          clicks
        };
      })
    );

    // Category distribution
    const categories = await Category.find({ isActive: true }).lean();
    const categoryStats = await Promise.all(
      categories.map(async (category) => {
        const count = await Product.countDocuments({ 
          categoryId: category._id,
          isActive: true 
        });
        return {
          name: category.name,
          count
        };
      })
    );

    res.json({
      success: true,
      data: {
        overview: {
          totalProducts,
          totalCategories,
          totalClicks
        },
        topProducts: transformedTopProducts,
        clicksByDay,
        categoryStats: categoryStats.filter(stat => stat.count > 0)
      }
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/analytics/clicks - Get detailed click analytics (Admin only)
router.get('/clicks', authenticateToken, async (req, res) => {
  try {
    const { startDate, endDate, productId } = req.query;
    
    // Build query
    const query = {};
    
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }
    
    if (productId) {
      query.productId = productId;
    }

    const clicks = await Click.find(query)
      .populate('productId', 'title')
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    const transformedClicks = clicks.map(click => ({
      ...click,
      id: click._id.toString(),
      productId: click.productId._id.toString(),
      productTitle: click.productId.title
    }));

    res.json({ success: true, data: transformedClicks });
  } catch (error) {
    console.error('Click analytics error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;