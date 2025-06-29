import mongoose from 'mongoose';

const clickSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: [true, 'Product ID is required']
  },
  userAgent: {
    type: String,
    default: ''
  },
  ip: {
    type: String,
    default: 'unknown'
  },
  referer: {
    type: String,
    default: ''
  },
  country: {
    type: String,
    default: ''
  },
  device: {
    type: String,
    enum: ['desktop', 'mobile', 'tablet', 'unknown'],
    default: 'unknown'
  }
}, {
  timestamps: true
});

// Index for better query performance
clickSchema.index({ productId: 1 });
clickSchema.index({ createdAt: -1 });
clickSchema.index({ ip: 1 });

// Pre-save middleware to detect device type
clickSchema.pre('save', function(next) {
  if (this.userAgent) {
    const ua = this.userAgent.toLowerCase();
    if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua)) {
      this.device = 'mobile';
    } else if (/tablet|ipad/i.test(ua)) {
      this.device = 'tablet';
    } else if (/mozilla|chrome|safari|firefox/i.test(ua)) {
      this.device = 'desktop';
    }
  }
  next();
});

export default mongoose.model('Click', clickSchema);