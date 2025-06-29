import express from 'express';
import Product from '../models/Product.js';
import Click from '../models/Click.js';

const router = express.Router();

// GET /api/redirect/:id - Track click and redirect to affiliate link
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Create click record
    const clickData = {
      productId: req.params.id,
      userAgent: req.headers['user-agent'] || '',
      ip: req.ip || req.connection.remoteAddress || 'unknown',
      referer: req.headers.referer || ''
    };

    // Save click record
    const click = new Click(clickData);
    await click.save();

    // Update product click count
    await Product.findByIdAndUpdate(
      req.params.id,
      { $inc: { clickCount: 1 } }
    );

    // Redirect to affiliate link
    res.redirect(product.affiliateLink);
  } catch (error) {
    console.error('Redirect error:', error);
    res.status(500).json({ success: false, message: 'Redirect failed' });
  }
});

export default router;