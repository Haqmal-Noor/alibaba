import mongoose from 'mongoose';
import { connectDB } from './config/database.js';
import Product from './models/Product.js';
import Category from './models/Category.js';
import User from './models/User.js';

// Connect to database
await connectDB();

const categories = [
  {
    name: 'Electronics',
    description: 'Latest electronic gadgets and devices'
  },
  {
    name: 'Clothing',
    description: 'Fashion and apparel for all occasions'
  },
  {
    name: 'Home & Garden',
    description: 'Home improvement and garden supplies'
  },
  {
    name: 'Sports & Outdoors',
    description: 'Sports equipment and outdoor gear'
  }
];

const seedDatabase = async () => {
  try {
    // Clear existing data
    await Product.deleteMany({});
    await Category.deleteMany({});
    await User.deleteMany({});

    console.log('🗑️  Cleared existing data');

    // Create categories
    const createdCategories = await Category.insertMany(categories);
    console.log('✅ Categories created');

    // Create products
    const products = [
      {
        title: 'Wireless Bluetooth Headphones',
        description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals who need crystal-clear audio quality.',
        price: 89.99,
        image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
        categoryId: createdCategories[0]._id, // Electronics
        affiliateLink: 'https://www.alibaba.com/product/headphones',
        clickCount: 15
      },
      {
        title: 'Smart Fitness Watch',
        description: 'Advanced fitness tracker with heart rate monitoring, GPS, and smartphone integration. Track your workouts, monitor your health, and stay connected.',
        price: 199.99,
        image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
        categoryId: createdCategories[0]._id, // Electronics
        affiliateLink: 'https://www.alibaba.com/product/smartwatch',
        clickCount: 23
      },
      {
        title: 'Casual Cotton T-Shirt',
        description: 'Comfortable 100% cotton t-shirt available in multiple colors and sizes. Soft, breathable fabric perfect for everyday wear.',
        price: 24.99,
        image: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg',
        categoryId: createdCategories[1]._id, // Clothing
        affiliateLink: 'https://www.alibaba.com/product/tshirt',
        clickCount: 8
      },
      {
        title: 'LED Desk Lamp',
        description: 'Adjustable LED desk lamp with multiple brightness levels and USB charging port. Energy-efficient lighting solution for your workspace.',
        price: 45.99,
        image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg',
        categoryId: createdCategories[2]._id, // Home & Garden
        affiliateLink: 'https://www.alibaba.com/product/desklamp',
        clickCount: 12
      },
      {
        title: 'Yoga Mat',
        description: 'Non-slip yoga mat with excellent grip and cushioning for all yoga practices. Made from eco-friendly materials with superior durability.',
        price: 34.99,
        image: 'https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg',
        categoryId: createdCategories[3]._id, // Sports & Outdoors
        affiliateLink: 'https://www.alibaba.com/product/yogamat',
        clickCount: 19
      },
      {
        title: 'Smartphone Camera Lens Kit',
        description: 'Professional camera lens kit for smartphones with wide-angle, macro, and fisheye lenses. Transform your mobile photography experience.',
        price: 67.99,
        image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
        categoryId: createdCategories[0]._id, // Electronics
        affiliateLink: 'https://www.alibaba.com/product/lens-kit',
        clickCount: 7
      },
      {
        title: 'Premium Denim Jeans',
        description: 'High-quality denim jeans with perfect fit and comfort. Classic design that never goes out of style, available in multiple washes.',
        price: 79.99,
        image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg',
        categoryId: createdCategories[1]._id, // Clothing
        affiliateLink: 'https://www.alibaba.com/product/jeans',
        clickCount: 14
      },
      {
        title: 'Indoor Plant Pot Set',
        description: 'Beautiful ceramic plant pot set perfect for indoor gardening. Includes drainage holes and saucers for healthy plant growth.',
        price: 32.99,
        image: 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg',
        categoryId: createdCategories[2]._id, // Home & Garden
        affiliateLink: 'https://www.alibaba.com/product/plant-pots',
        clickCount: 9
      }
    ];

    await Product.insertMany(products);
    console.log('✅ Products created');

    // Create default admin user
    const adminUser = new User({
      username: 'admin',
      password: 'admin123',
      role: 'admin'
    });
    await adminUser.save();
    console.log('✅ Admin user created');

    console.log('🎉 Database seeded successfully!');
    console.log('📊 Summary:');
    console.log(`   - ${createdCategories.length} categories`);
    console.log(`   - ${products.length} products`);
    console.log(`   - 1 admin user`);
    console.log('');
    console.log('🔐 Admin credentials:');
    console.log('   Username: admin');
    console.log('   Password: admin123');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('📡 Database connection closed');
  }
};

seedDatabase();