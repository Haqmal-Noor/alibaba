import mongoose from "mongoose";
import { connectDB } from "./config/database.js";
import Product from "./models/Product.js";
import Category from "./models/Category.js";
import User from "./models/User.js";

// Connect to database
await connectDB();

const categories = [
  {
    name: "Electronics",
    description: "Latest electronic gadgets and devices",
  },
  {
    name: "Clothing",
    description: "Fashion and apparel for all occasions",
  },
  {
    name: "Home & Garden",
    description: "Home improvement and garden supplies",
  },
  {
    name: "Sports & Outdoors",
    description: "Sports equipment and outdoor gear",
  },
];

const seedDatabase = async () => {
  try {
    // Clear existing data
    await Product.deleteMany({});
    await Category.deleteMany({});
    await User.deleteMany({});

    console.log("🗑️  Cleared existing data");

    // Create categories
    const createdCategories = await Category.insertMany(categories);
    console.log("✅ Categories created");

    // Create products
    const products = [
      {
        title: "Wireless Bluetooth Headphones",
        description:
          "High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals who need crystal-clear audio quality.",
        price: 89.99,
        image:
          "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
        categoryId: createdCategories[0]._id, // Electronics
        affiliateLink: "https://www.alibaba.com/product/headphones",
        clickCount: 15,
      },
      {
        title: "Smart Fitness Watch",
        description:
          "Advanced fitness tracker with heart rate monitoring, GPS, and smartphone integration. Track your workouts, monitor your health, and stay connected.",
        price: 199.99,
        image:
          "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg",
        categoryId: createdCategories[0]._id, // Electronics
        affiliateLink: "https://www.alibaba.com/product/smartwatch",
        clickCount: 23,
      },
      {
        title: "Casual Cotton T-Shirt",
        description:
          "Comfortable 100% cotton t-shirt available in multiple colors and sizes. Soft, breathable fabric perfect for everyday wear.",
        price: 24.99,
        image:
          "https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg",
        categoryId: createdCategories[1]._id, // Clothing
        affiliateLink: "https://www.alibaba.com/product/tshirt",
        clickCount: 8,
      },
      {
        title: "LED Desk Lamp",
        description:
          "Adjustable LED desk lamp with multiple brightness levels and USB charging port. Energy-efficient lighting solution for your workspace.",
        price: 45.99,
        image:
          "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg",
        categoryId: createdCategories[2]._id, // Home & Garden
        affiliateLink: "https://www.alibaba.com/product/desklamp",
        clickCount: 12,
      },
      {
        title: "Yoga Mat",
        description:
          "Non-slip yoga mat with excellent grip and cushioning for all yoga practices. Made from eco-friendly materials with superior durability.",
        price: 34.99,
        image:
          "https://images.pexels.com/photos/4056723/pexels-photo-4056723.jpeg",
        categoryId: createdCategories[3]._id, // Sports & Outdoors
        affiliateLink: "https://www.alibaba.com/product/yogamat",
        clickCount: 19,
      },
      {
        title: "Smartphone Camera Lens Kit",
        description:
          "Professional camera lens kit for smartphones with wide-angle, macro, and fisheye lenses. Transform your mobile photography experience.",
        price: 67.99,
        image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg",
        categoryId: createdCategories[0]._id, // Electronics
        affiliateLink: "https://www.alibaba.com/product/lens-kit",
        clickCount: 7,
      },
      {
        title: "Premium Denim Jeans",
        description:
          "High-quality denim jeans with perfect fit and comfort. Classic design that never goes out of style, available in multiple washes.",
        price: 79.99,
        image:
          "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg",
        categoryId: createdCategories[1]._id, // Clothing
        affiliateLink: "https://www.alibaba.com/product/jeans",
        clickCount: 14,
      },
      {
        title: "Indoor Plant Pot Set",
        description:
          "Beautiful ceramic plant pot set perfect for indoor gardening. Includes drainage holes and saucers for healthy plant growth.",
        price: 32.99,
        image:
          "https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg",
        categoryId: createdCategories[2]._id, // Home & Garden
        affiliateLink: "https://www.alibaba.com/product/plant-pots",
        clickCount: 9,
      },
      // 20 Additional Products
      {
        title: "Wireless Charging Pad",
        description:
          "Fast wireless charging pad compatible with all Qi-enabled devices. Sleek design with LED indicator and overcharge protection.",
        price: 29.99,
        image:
          "https://images.pexels.com/photos/4219654/pexels-photo-4219654.jpeg",
        categoryId: createdCategories[0]._id, // Electronics
        affiliateLink: "https://www.alibaba.com/product/wireless-charger",
        clickCount: 11,
      },
      {
        title: "Bluetooth Speaker",
        description:
          "Portable Bluetooth speaker with 360-degree sound, waterproof design, and 12-hour battery life. Perfect for outdoor adventures.",
        price: 54.99,
        image:
          "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg",
        categoryId: createdCategories[0]._id, // Electronics
        affiliateLink: "https://www.alibaba.com/product/bluetooth-speaker",
        clickCount: 18,
      },
      {
        title: "Gaming Mechanical Keyboard",
        description:
          "RGB backlit mechanical keyboard with tactile switches, programmable keys, and anti-ghosting technology for gaming enthusiasts.",
        price: 129.99,
        image:
          "https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg",
        categoryId: createdCategories[0]._id, // Electronics
        affiliateLink: "https://www.alibaba.com/product/gaming-keyboard",
        clickCount: 25,
      },
      {
        title: "USB-C Hub",
        description:
          "7-in-1 USB-C hub with HDMI, USB 3.0 ports, SD card reader, and PD charging. Essential accessory for modern laptops.",
        price: 39.99,
        image:
          "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg",
        categoryId: createdCategories[0]._id, // Electronics
        affiliateLink: "https://www.alibaba.com/product/usb-hub",
        clickCount: 13,
      },
      {
        title: "Hoodie Sweatshirt",
        description:
          "Cozy fleece-lined hoodie with kangaroo pocket and adjustable drawstring. Perfect for casual wear and layering.",
        price: 49.99,
        image:
          "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg",
        categoryId: createdCategories[1]._id, // Clothing
        affiliateLink: "https://www.alibaba.com/product/hoodie",
        clickCount: 16,
      },
      {
        title: "Summer Dress",
        description:
          "Elegant floral summer dress with breathable fabric and flattering silhouette. Perfect for casual outings and special occasions.",
        price: 64.99,
        image:
          "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg",
        categoryId: createdCategories[1]._id, // Clothing
        affiliateLink: "https://www.alibaba.com/product/summer-dress",
        clickCount: 21,
      },
      {
        title: "Leather Jacket",
        description:
          "Genuine leather jacket with classic biker style, multiple pockets, and durable construction. Timeless fashion statement.",
        price: 189.99,
        image:
          "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg",
        categoryId: createdCategories[1]._id, // Clothing
        affiliateLink: "https://www.alibaba.com/product/leather-jacket",
        clickCount: 29,
      },
      {
        title: "Running Shoes",
        description:
          "Lightweight running shoes with responsive cushioning, breathable mesh upper, and durable rubber outsole for all terrains.",
        price: 94.99,
        image:
          "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
        categoryId: createdCategories[1]._id, // Clothing
        affiliateLink: "https://www.alibaba.com/product/running-shoes",
        clickCount: 33,
      },
      {
        title: "Coffee Maker",
        description:
          "Programmable drip coffee maker with thermal carafe, auto-brew timer, and pause-and-serve feature. Start your day right.",
        price: 79.99,
        image:
          "https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg",
        categoryId: createdCategories[2]._id, // Home & Garden
        affiliateLink: "https://www.alibaba.com/product/coffee-maker",
        clickCount: 17,
      },
      {
        title: "Air Purifier",
        description:
          "HEPA air purifier with 3-stage filtration system, quiet operation, and smart air quality monitoring for healthier indoor air.",
        price: 149.99,
        image:
          "https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg",
        categoryId: createdCategories[2]._id, // Home & Garden
        affiliateLink: "https://www.alibaba.com/product/air-purifier",
        clickCount: 22,
      },
      {
        title: "Kitchen Knife Set",
        description:
          "Professional 8-piece kitchen knife set with wooden block, sharpening steel, and kitchen shears. Essential for home chefs.",
        price: 89.99,
        image:
          "https://images.pexels.com/photos/2291367/pexels-photo-2291367.jpeg",
        categoryId: createdCategories[2]._id, // Home & Garden
        affiliateLink: "https://www.alibaba.com/product/knife-set",
        clickCount: 14,
      },
      {
        title: "Throw Pillows Set",
        description:
          "Decorative throw pillows set of 4 with removable covers in modern patterns. Add comfort and style to any living space.",
        price: 34.99,
        image:
          "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
        categoryId: createdCategories[2]._id, // Home & Garden
        affiliateLink: "https://www.alibaba.com/product/throw-pillows",
        clickCount: 10,
      },
      {
        title: "Resistance Bands Set",
        description:
          "Complete resistance bands set with 5 different resistance levels, door anchor, handles, and ankle straps for full-body workouts.",
        price: 24.99,
        image:
          "https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg",
        categoryId: createdCategories[3]._id, // Sports & Outdoors
        affiliateLink: "https://www.alibaba.com/product/resistance-bands",
        clickCount: 27,
      },
      {
        title: "Camping Tent",
        description:
          "4-person waterproof camping tent with easy setup, ventilation system, and compact carry bag. Perfect for outdoor adventures.",
        price: 119.99,
        image:
          "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg",
        categoryId: createdCategories[3]._id, // Sports & Outdoors
        affiliateLink: "https://www.alibaba.com/product/camping-tent",
        clickCount: 31,
      },
      {
        title: "Water Bottle",
        description:
          "Insulated stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours. BPA-free and leak-proof design.",
        price: 19.99,
        image:
          "https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg",
        categoryId: createdCategories[3]._id, // Sports & Outdoors
        affiliateLink: "https://www.alibaba.com/product/water-bottle",
        clickCount: 8,
      },
      {
        title: "Hiking Backpack",
        description:
          "40L hiking backpack with multiple compartments, hydration system compatibility, and ergonomic design for long-distance trekking.",
        price: 74.99,
        image:
          "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg",
        categoryId: createdCategories[3]._id, // Sports & Outdoors
        affiliateLink: "https://www.alibaba.com/product/hiking-backpack",
        clickCount: 20,
      },
      {
        title: "Dumbbells Set",
        description:
          "Adjustable dumbbells set with quick-change weight system from 5-50 lbs per dumbbell. Space-saving home gym solution.",
        price: 299.99,
        image:
          "https://images.pexels.com/photos/416717/pexels-photo-416717.jpeg",
        categoryId: createdCategories[3]._id, // Sports & Outdoors
        affiliateLink: "https://www.alibaba.com/product/dumbbells",
        clickCount: 35,
      },
      {
        title: "Tablet Stand",
        description:
          "Adjustable aluminum tablet stand with 360-degree rotation and foldable design. Compatible with tablets 4-13 inches.",
        price: 22.99,
        image:
          "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg",
        categoryId: createdCategories[0]._id, // Electronics
        affiliateLink: "https://www.alibaba.com/product/tablet-stand",
        clickCount: 6,
      },
      {
        title: "Silk Scarf",
        description:
          "Luxurious 100% silk scarf with elegant patterns and vibrant colors. Versatile accessory for any outfit and season.",
        price: 39.99,
        image:
          "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg",
        categoryId: createdCategories[1]._id, // Clothing
        affiliateLink: "https://www.alibaba.com/product/silk-scarf",
        clickCount: 12,
      },
      {
        title: "Essential Oil Diffuser",
        description:
          "Ultrasonic essential oil diffuser with LED lights, timer settings, and auto shut-off. Create a relaxing atmosphere at home.",
        price: 44.99,
        image:
          "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg",
        categoryId: createdCategories[2]._id, // Home & Garden
        affiliateLink: "https://www.alibaba.com/product/oil-diffuser",
        clickCount: 15,
      },
      {
        title: "Foam Roller",
        description:
          "High-density foam roller for muscle recovery and injury prevention. Textured surface provides deep tissue massage.",
        price: 28.99,
        image:
          "https://images.pexels.com/photos/4162449/pexels-photo-4162449.jpeg",
        categoryId: createdCategories[3]._id, // Sports & Outdoors
        affiliateLink: "https://www.alibaba.com/product/foam-roller",
        clickCount: 24,
      },
    ];

    await Product.insertMany(products);
    console.log("✅ Products created");

    // Create default admin user
    const adminUser = new User({
      username: "admin",
      password: "admin123",
      role: "admin",
    });
    await adminUser.save();
    console.log("✅ Admin user created");

    console.log("🎉 Database seeded successfully!");
    console.log("📊 Summary:");
    console.log(`   - ${createdCategories.length} categories`);
    console.log(`   - ${products.length} products`);
    console.log(`   - 1 admin user`);
    console.log("");
    console.log("🔐 Admin credentials:");
    console.log("   Username: admin");
    console.log("   Password: admin123");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await mongoose.connection.close();
    console.log("📡 Database connection closed");
  }
};

seedDatabase();
