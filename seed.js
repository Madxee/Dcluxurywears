require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const Settings = require('./models/Settings');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB...');

    // Clear existing products
    await Product.deleteMany();
    console.log('Cleared existing products');

    // Insert sample products
    const products = [
      {
        name: "Premium Native Agbada Set",
        category: "clothes",
        price: 85000,
        originalPrice: 95000,
        description: "Handcrafted premium agbada set with intricate embroidery. Perfect for special occasions and traditional events. Made from high-quality materials with attention to detail.",
        images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800"],
        sizes: ["M", "L", "XL", "XXL"],
        stock: "in-stock",
        featured: true,
        new: false,
        rating: 4.8,
        reviews: 12
      },
      {
        name: "Luxury Leather Oxford Shoes",
        category: "shoes",
        price: 65000,
        originalPrice: null,
        description: "Genuine Italian leather oxford shoes with hand-stitched details. Features cushioned insole for all-day comfort and durable leather sole.",
        images: ["https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800"],
        sizes: ["40", "41", "42", "43", "44", "45"],
        stock: "in-stock",
        featured: true,
        new: true,
        rating: 4.9,
        reviews: 8
      },
      {
        name: "Classic Chronograph Watch",
        category: "watches",
        price: 125000,
        originalPrice: 150000,
        description: "Elegant chronograph watch with stainless steel case and genuine leather strap. Water-resistant up to 50m with sapphire crystal glass.",
        images: ["https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800"],
        sizes: [],
        stock: "in-stock",
        featured: true,
        new: false,
        rating: 4.7,
        reviews: 15
      },
      {
        name: "Designer Caps Collection",
        category: "accessories",
        price: 15000,
        originalPrice: null,
        description: "Premium designer caps with embroidered logos. Adjustable fit with breathable fabric. Multiple teams and styles available.",
        images: ["https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800"],
        sizes: ["One Size"],
        stock: "in-stock",
        featured: false,
        new: true,
        rating: 4.5,
        reviews: 20
      },
      {
        name: "Premium Sneakers Collection",
        category: "shoes",
        price: 75000,
        originalPrice: 90000,
        description: "High-end designer sneakers with premium materials. Comfortable fit with durable rubber sole. Available in multiple colorways.",
        images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800"],
        sizes: ["40", "41", "42", "43", "44"],
        stock: "in-stock",
        featured: true,
        new: true,
        rating: 4.6,
        reviews: 10
      },
      {
        name: "Luxury Shopper Bag",
        category: "accessories",
        price: 45000,
        originalPrice: null,
        description: "Premium leather shopper bag with gold-tone hardware. Spacious interior with multiple compartments. Perfect for everyday luxury.",
        images: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800"],
        sizes: [],
        stock: "in-stock",
        featured: false,
        new: false,
        rating: 4.8,
        reviews: 6
      },
      {
        name: "Traditional Embroidered Shirt",
        category: "clothes",
        price: 35000,
        originalPrice: null,
        description: "Beautifully embroidered traditional shirt with modern fit. Perfect for cultural events and Friday wear.",
        images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800"],
        sizes: ["S", "M", "L", "XL"],
        stock: "in-stock",
        featured: false,
        new: true,
        rating: 4.4,
        reviews: 9
      },
      {
        name: "Limited Edition Basketball",
        category: "accessories",
        price: 25000,
        originalPrice: null,
        description: "Official size limited edition basketball. Premium composite leather with excellent grip. Perfect for collectors and players.",
        images: ["https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800"],
        sizes: [],
        stock: "in-stock",
        featured: false,
        new: true,
        rating: 4.7,
        reviews: 5
      }
    ];

    await Product.insertMany(products);
    console.log(`Inserted ${products.length} products`);

    // Ensure settings exist
    await Settings.getSettings();
    console.log('Settings initialized');

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();
