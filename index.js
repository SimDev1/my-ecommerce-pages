const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
require('dotenv').config();
require('./config/db'); // connect to database

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);

// Sample product data
const products = [
  {
    id: 1,
    name: "Audio Player",
    description: "This is an audio player",
    price: 29.99,
    image: "/assets/Audioplayer.jpg"
  },
  {
    id: 2,
    name: "Beddings",
    description: "This is a wonderful bed stand",
    price: 39.99,
    image: "/assets/beddings.jpg"
  },
    {
    id: 3,
    name: "Comfortable Beddings",
    description: "This is for your convenient rest",
    price: 49.00,
    image: "/assets/beddings2.jpg"
  },
    {
    id: 4,
    name: "Balanced Bicycle",
    description: "This is a very wonderful bicycle",
    price: 39.00,
    image: "/assets/bicycle.jpg"
  },
    {
    id: 5,
    name: "Kids Bicycle",
    description: "Fun to ride",
    price: 29.99,
    image: "/assets/bicycle2.jpg"
  },
    {
    id: 6,
    name: "Soft Chairs",
    description: "A good sofs for your comfort",
    price: 17.99,
    image: "/assets/chairs.jpg"
  },
    {
    id: 7,
    name: "Chess",
    description: "Excellent mind game to build your reasoning",
    price: 6.49,
    image: "/assets/chess.jpg"
  },
    {
    id: 8,
    name: "Baby Diaper",
    description: "For your baby comfort",
    price: 6.79,
    image: "/assets/diapers1.jpg"
  },
    {
    id: 9,
    name: "Baby Diapers",
    description: "Stay comfortable as a baby!",
    price: 6.99,
    image: "/assets/diapers2.jpg"
  },
    {
    id: 10,
    name: "Warm Painting",
    description: " A materpiece drawing to beautify your home",
    price: 52.00,
    image: "/assets/drawing.jpg"
  },
    {
    id: 11,
    name: "Flour Mixture",
    description: "Best for your baking purposes",
    price: 11.99,
    image: "/assets/flour.jpg"
  },
    {
    id: 12,
    name: "Hair Care",
    description: "Contains the best formula to treat any form of hair issues",
    price: 14.00,
    image: "/assets/haircare.jpg"
  },
    {
    id: 13,
    name: "HISense SmartTV",
    description: "With quality images and live streaming form Showmax",
    price: 119.99,
    image: "/assets/Hi sense.jpg"
  },
    {
    id: 14,
    name: "HP Laptop",
    description: "When you seek for quality, try HP!",
    price: 104.99,
    image: "/assets/HP laptop.jpg"
  },
    {
    id: 15,
    name: "Huawei Smartphone",
    description: "Quality and affordable smartphones",
    price: 64.99,
    image: "/assets/Huawei.jpg"
  },
    {
    id: 16,
    name: "I Phone 15",
    description: "The I Phone 15 still got you covered",
    price: 86.99,
    image: "/assets/iphone.jpg"
  },
    {
    id: 17,
    name: "Laptop Charger",
    description: "Quality Laptop Chargers",
    price: 19.99,
    image: "/assets/laptop charger.jpg"
  },
    {
    id: 18,
    name: "LG SmartTV",
    description: "This is a quality Smart TV from LG",
    price: 99.99,
    image: "/assets/LGSMART.jpg"
  },
    {
    id: 19,
    name: "Face MakeUp",
    description: "Adorn your face with our quality makeup kit",
    price: 16.49,
    image: "/assets/makeup.jpg"
  },
    {
    id: 20,
    name: "Modem",
    description: "Fast and reliable access to the internet",
    price: 5.49,
    image: "/assets/modem.jpg"
  }
  
];

// GET all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// ✅ GET product by ID
app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));





