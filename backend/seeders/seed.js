import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Item from '../models/Item.js';
import connectDB from '../config/database.js';

dotenv.config();

const seedItems = [
  // Electronics (20 items)
  {
    name: "iPhone 15 Pro",
    description: "Latest Apple smartphone with A17 Pro chip and titanium design",
    price: 999.99,
    category: "Electronics",
    image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg",
    brand: "Apple",
    rating: 4.8,
    reviews: 2547
  },
  {
    name: "MacBook Air M2",
    description: "Lightweight laptop with M2 chip and 13.6-inch Liquid Retina display",
    price: 1199.99,
    category: "Electronics",
    image: "https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg",
    brand: "Apple",
    rating: 4.7,
    reviews: 1823
  },
  {
    name: "Samsung Galaxy S24",
    description: "Android flagship with AI features and 50MP camera",
    price: 899.99,
    category: "Electronics",
    image: "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg",
    brand: "Samsung",
    rating: 4.6,
    reviews: 1456
  },
  {
    name: "Sony WH-1000XM5",
    description: "Premium noise-canceling wireless headphones",
    price: 399.99,
    category: "Electronics",
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg",
    brand: "Sony",
    rating: 4.9,
    reviews: 3421
  },
  {
    name: "iPad Pro 12.9\"",
    description: "Professional tablet with M2 chip and Liquid Retina XDR display",
    price: 1099.99,
    category: "Electronics",
    image: "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg",
    brand: "Apple",
    rating: 4.8,
    reviews: 987
  },
  {
    name: "Nintendo Switch OLED",
    description: "Portable gaming console with 7-inch OLED screen",
    price: 349.99,
    category: "Electronics",
    image: "https://images.pexels.com/photos/3945667/pexels-photo-3945667.jpeg",
    brand: "Nintendo",
    rating: 4.7,
    reviews: 2134
  },
  {
    name: "Dell XPS 13",
    description: "Ultra-thin laptop with 13.4-inch InfinityEdge display",
    price: 999.99,
    category: "Electronics",
    image: "https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg",
    brand: "Dell",
    rating: 4.5,
    reviews: 756
  },
  {
    name: "AirPods Pro 2nd Gen",
    description: "Wireless earbuds with active noise cancellation",
    price: 249.99,
    category: "Electronics",
    image: "https://images.pexels.com/photos/8534088/pexels-photo-8534088.jpeg",
    brand: "Apple",
    rating: 4.8,
    reviews: 4567
  },
  {
    name: "Samsung 65\" QLED TV",
    description: "4K Smart TV with Quantum Dot technology",
    price: 1299.99,
    category: "Electronics",
    image: "https://images.pexels.com/photos/1444416/pexels-photo-1444416.jpeg",
    brand: "Samsung",
    rating: 4.6,
    reviews: 892
  },
  {
    name: "Canon EOS R6",
    description: "Full-frame mirrorless camera with 20.1MP sensor",
    price: 2499.99,
    category: "Electronics",
    image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg",
    brand: "Canon",
    rating: 4.9,
    reviews: 543
  },
  {
    name: "PlayStation 5",
    description: "Next-gen gaming console with 8K support",
    price: 499.99,
    category: "Electronics",
    image: "https://images.pexels.com/photos/7222433/pexels-photo-7222433.jpeg",
    brand: "Sony",
    rating: 4.8,
    reviews: 3456
  },
  {
    name: "Apple Watch Series 9",
    description: "Advanced smartwatch with health monitoring",
    price: 399.99,
    category: "Electronics",
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg",
    brand: "Apple",
    rating: 4.7,
    reviews: 2876
  },
  {
    name: "Microsoft Surface Pro 9",
    description: "2-in-1 laptop tablet with touchscreen",
    price: 1199.99,
    category: "Electronics",
    image: "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg",
    brand: "Microsoft",
    rating: 4.5,
    reviews: 634
  },
  {
    name: "Google Pixel 8 Pro",
    description: "AI-powered Android phone with exceptional camera",
    price: 999.99,
    category: "Electronics",
    image: "https://images.pexels.com/photos/163143/iphone-smartphone-apps-apple-163143.jpeg",
    brand: "Google",
    rating: 4.6,
    reviews: 1234
  },
  {
    name: "Bose SoundBar 900",
    description: "Premium soundbar with Dolby Atmos support",
    price: 899.99,
    category: "Electronics",
    image: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg",
    brand: "Bose",
    rating: 4.7,
    reviews: 567
  },
  {
    name: "AMD Ryzen 9 7950X",
    description: "High-performance desktop processor",
    price: 699.99,
    category: "Electronics",
    image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg",
    brand: "AMD",
    rating: 4.8,
    reviews: 345
  },
  {
    name: "NVIDIA RTX 4080",
    description: "High-end graphics card for gaming and content creation",
    price: 1199.99,
    category: "Electronics",
    image: "https://images.pexels.com/photos/2582933/pexels-photo-2582933.jpeg",
    brand: "NVIDIA",
    rating: 4.9,
    reviews: 789
  },
  {
    name: "Amazon Echo Dot",
    description: "Smart speaker with Alexa voice assistant",
    price: 49.99,
    category: "Electronics",
    image: "https://images.pexels.com/photos/7686209/pexels-photo-7686209.jpeg",
    brand: "Amazon",
    rating: 4.4,
    reviews: 5678
  },
  {
    name: "Ring Video Doorbell",
    description: "Smart doorbell with HD video and motion detection",
    price: 199.99,
    category: "Electronics",
    image: "https://images.pexels.com/photos/8092530/pexels-photo-8092530.jpeg",
    brand: "Ring",
    rating: 4.3,
    reviews: 1987
  },
  {
    name: "Tesla Model Y Charger",
    description: "Home charging solution for Tesla vehicles",
    price: 599.99,
    category: "Electronics",
    image: "https://images.pexels.com/photos/7937672/pexels-photo-7937672.jpeg",
    brand: "Tesla",
    rating: 4.8,
    reviews: 234
  },

  // Clothing (20 items)
  {
    name: "Levi's 501 Original Jeans",
    description: "Classic straight-leg denim jeans",
    price: 89.99,
    category: "Clothing",
    image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
    brand: "Levi's",
    rating: 4.6,
    reviews: 3456
  },
  {
    name: "Nike Air Force 1",
    description: "Iconic basketball shoes with leather upper",
    price: 109.99,
    category: "Clothing",
    image: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg",
    brand: "Nike",
    rating: 4.8,
    reviews: 5678
  },
  {
    name: "Adidas Ultraboost 22",
    description: "High-performance running shoes",
    price: 179.99,
    category: "Clothing",
    image: "https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg",
    brand: "Adidas",
    rating: 4.7,
    reviews: 2345
  },
  {
    name: "Patagonia Fleece Jacket",
    description: "Warm and sustainable outdoor jacket",
    price: 159.99,
    category: "Clothing",
    image: "https://images.pexels.com/photos/16170/pexels-photo.jpg",
    brand: "Patagonia",
    rating: 4.9,
    reviews: 1234
  },
  {
    name: "Champion Hoodie",
    description: "Comfortable pullover hoodie",
    price: 49.99,
    category: "Clothing",
    image: "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg",
    brand: "Champion",
    rating: 4.5,
    reviews: 2876
  },
  {
    name: "Ralph Lauren Polo Shirt",
    description: "Classic cotton polo shirt",
    price: 79.99,
    category: "Clothing",
    image: "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg",
    brand: "Ralph Lauren",
    rating: 4.7,
    reviews: 1567
  },
  {
    name: "Vans Old Skool",
    description: "Classic skateboarding shoes",
    price: 69.99,
    category: "Clothing",
    image: "https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg",
    brand: "Vans",
    rating: 4.6,
    reviews: 3421
  },
  {
    name: "North Face Puffer Jacket",
    description: "Insulated winter jacket",
    price: 249.99,
    category: "Clothing",
    image: "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg",
    brand: "North Face",
    rating: 4.8,
    reviews: 987
  },
  {
    name: "Calvin Klein Underwear Set",
    description: "Premium cotton underwear 3-pack",
    price: 39.99,
    category: "Clothing",
    image: "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg",
    brand: "Calvin Klein",
    rating: 4.4,
    reviews: 4567
  },
  {
    name: "Zara Blazer",
    description: "Modern tailored blazer",
    price: 129.99,
    category: "Clothing",
    image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
    brand: "Zara",
    rating: 4.3,
    reviews: 765
  },
  {
    name: "H&M Basic T-Shirt Pack",
    description: "Soft cotton t-shirts 5-pack",
    price: 24.99,
    category: "Clothing",
    image: "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg",
    brand: "H&M",
    rating: 4.2,
    reviews: 6789
  },
  {
    name: "Lululemon Yoga Pants",
    description: "High-quality activewear leggings",
    price: 128.99,
    category: "Clothing",
    image: "https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg",
    brand: "Lululemon",
    rating: 4.9,
    reviews: 1876
  },
  {
    name: "Converse Chuck Taylor",
    description: "Classic canvas high-top sneakers",
    price: 59.99,
    category: "Clothing",
    image: "https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg",
    brand: "Converse",
    rating: 4.5,
    reviews: 4321
  },
  {
    name: "Tommy Hilfiger Dress Shirt",
    description: "Professional cotton dress shirt",
    price: 69.99,
    category: "Clothing",
    image: "https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg",
    brand: "Tommy Hilfiger",
    rating: 4.6,
    reviews: 543
  },
  {
    name: "Forever 21 Summer Dress",
    description: "Flowy summer dress with floral pattern",
    price: 34.99,
    category: "Clothing",
    image: "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg",
    brand: "Forever 21",
    rating: 4.1,
    reviews: 2345
  },
  {
    name: "Gap Chino Pants",
    description: "Versatile cotton chino pants",
    price: 59.99,
    category: "Clothing",
    image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg",
    brand: "Gap",
    rating: 4.4,
    reviews: 1654
  },
  {
    name: "Under Armour Sports Bra",
    description: "High-support sports bra for workouts",
    price: 49.99,
    category: "Clothing",
    image: "https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg",
    brand: "Under Armour",
    rating: 4.7,
    reviews: 2109
  },
  {
    name: "Timberland Boots",
    description: "Waterproof leather work boots",
    price: 189.99,
    category: "Clothing",
    image: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg",
    brand: "Timberland",
    rating: 4.8,
    reviews: 876
  },
  {
    name: "Ray-Ban Aviators",
    description: "Classic aviator sunglasses",
    price: 159.99,
    category: "Clothing",
    image: "https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg",
    brand: "Ray-Ban",
    rating: 4.7,
    reviews: 3456
  },
  {
    name: "Fossil Leather Watch",
    description: "Elegant leather strap watch",
    price: 129.99,
    category: "Clothing",
    image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg",
    brand: "Fossil",
    rating: 4.5,
    reviews: 1098
  },

  // Home & Garden (20 items)
  {
    name: "Dyson V15 Vacuum",
    description: "Powerful cordless vacuum with laser detection",
    price: 749.99,
    category: "Home & Garden",
    image: "https://images.pexels.com/photos/4099235/pexels-photo-4099235.jpeg",
    brand: "Dyson",
    rating: 4.8,
    reviews: 1876
  },
  {
    name: "KitchenAid Stand Mixer",
    description: "Professional-grade stand mixer",
    price: 379.99,
    category: "Home & Garden",
    image: "https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg",
    brand: "KitchenAid",
    rating: 4.9,
    reviews: 2345
  },
  {
    name: "Instant Pot Duo",
    description: "7-in-1 electric pressure cooker",
    price: 99.99,
    category: "Home & Garden",
    image: "https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg",
    brand: "Instant Pot",
    rating: 4.7,
    reviews: 5678
  },
  {
    name: "Shark Robot Vacuum",
    description: "Self-emptying robot vacuum",
    price: 599.99,
    category: "Home & Garden",
    image: "https://images.pexels.com/photos/4099235/pexels-photo-4099235.jpeg",
    brand: "Shark",
    rating: 4.5,
    reviews: 1432
  },
  {
    name: "Nespresso Coffee Machine",
    description: "Single-serve espresso machine",
    price: 199.99,
    category: "Home & Garden",
    image: "https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg",
    brand: "Nespresso",
    rating: 4.6,
    reviews: 3421
  },
  {
    name: "Le Creuset Dutch Oven",
    description: "Enameled cast iron dutch oven",
    price: 349.99,
    category: "Home & Garden",
    image: "https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg",
    brand: "Le Creuset",
    rating: 4.9,
    reviews: 876
  },
  {
    name: "Philips Air Fryer",
    description: "Healthy cooking air fryer",
    price: 249.99,
    category: "Home & Garden",
    image: "https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg",
    brand: "Philips",
    rating: 4.7,
    reviews: 2109
  },
  {
    name: "West Elm Dining Table",
    description: "Modern wooden dining table",
    price: 899.99,
    category: "Home & Garden",
    image: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg",
    brand: "West Elm",
    rating: 4.4,
    reviews: 543
  },
  {
    name: "IKEA MALM Dresser",
    description: "6-drawer dresser with modern design",
    price: 179.99,
    category: "Home & Garden",
    image: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg",
    brand: "IKEA",
    rating: 4.3,
    reviews: 3456
  },
  {
    name: "Breville Toaster Oven",
    description: "Smart convection toaster oven",
    price: 279.99,
    category: "Home & Garden",
    image: "https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg",
    brand: "Breville",
    rating: 4.8,
    reviews: 765
  },
  {
    name: "Ninja Blender",
    description: "High-speed blender for smoothies",
    price: 149.99,
    category: "Home & Garden",
    image: "https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg",
    brand: "Ninja",
    rating: 4.6,
    reviews: 1987
  },
  {
    name: "Roomba i7+",
    description: "Self-emptying robot vacuum",
    price: 799.99,
    category: "Home & Garden",
    image: "https://images.pexels.com/photos/4099235/pexels-photo-4099235.jpeg",
    brand: "iRobot",
    rating: 4.7,
    reviews: 1234
  },
  {
    name: "Crate & Barrel Sofa",
    description: "Comfortable 3-seater sofa",
    price: 1299.99,
    category: "Home & Garden",
    image: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg",
    brand: "Crate & Barrel",
    rating: 4.5,
    reviews: 432
  },
  {
    name: "Pottery Barn Lamp",
    description: "Modern table lamp with fabric shade",
    price: 159.99,
    category: "Home & Garden",
    image: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg",
    brand: "Pottery Barn",
    rating: 4.4,
    reviews: 678
  },
  {
    name: "Weber Gas Grill",
    description: "Outdoor gas barbecue grill",
    price: 599.99,
    category: "Home & Garden",
    image: "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg",
    brand: "Weber",
    rating: 4.8,
    reviews: 1098
  },
  {
    name: "Cuisinart Food Processor",
    description: "14-cup food processor with multiple attachments",
    price: 199.99,
    category: "Home & Garden",
    image: "https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg",
    brand: "Cuisinart",
    rating: 4.7,
    reviews: 1543
  },
  {
    name: "Honeywell Humidifier",
    description: "Cool mist humidifier for large rooms",
    price: 89.99,
    category: "Home & Garden",
    image: "https://images.pexels.com/photos/4099235/pexels-photo-4099235.jpeg",
    brand: "Honeywell",
    rating: 4.3,
    reviews: 2876
  },
  {
    name: "Black+Decker Drill Set",
    description: "Cordless drill with 30-piece accessory kit",
    price: 79.99,
    category: "Home & Garden",
    image: "https://images.pexels.com/photos/162553/tools-hand-tools-work-repair-162553.jpeg",
    brand: "Black+Decker",
    rating: 4.5,
    reviews: 1876
  },
  {
    name: "Scotts Lawn Mower",
    description: "Self-propelled gas lawn mower",
    price: 449.99,
    category: "Home & Garden",
    image: "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg",
    brand: "Scotts",
    rating: 4.6,
    reviews: 654
  },
  {
    name: "Keurig Coffee Maker",
    description: "Single-serve K-Cup coffee maker",
    price: 129.99,
    category: "Home & Garden",
    image: "https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg",
    brand: "Keurig",
    rating: 4.4,
    reviews: 3456
  },

  // Sports (20 items)
  {
    name: "Spalding Basketball",
    description: "Official size basketball for indoor/outdoor play",
    price: 29.99,
    category: "Sports",
    image: "https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg",
    brand: "Spalding",
    rating: 4.7,
    reviews: 2345
  },
  {
    name: "Wilson Tennis Racket",
    description: "Professional tennis racket",
    price: 179.99,
    category: "Sports",
    image: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg",
    brand: "Wilson",
    rating: 4.8,
    reviews: 1234
  },
  {
    name: "Bowflex Dumbbells",
    description: "Adjustable dumbbells set",
    price: 549.99,
    category: "Sports",
    image: "https://images.pexels.com/photos/4164596/pexels-photo-4164596.jpeg",
    brand: "Bowflex",
    rating: 4.9,
    reviews: 876
  },
  {
    name: "Peloton Bike",
    description: "Indoor cycling bike with live classes",
    price: 1495.99,
    category: "Sports",
    image: "https://images.pexels.com/photos/4164596/pexels-photo-4164596.jpeg",
    brand: "Peloton",
    rating: 4.6,
    reviews: 1567
  },
  {
    name: "YETI Cooler",
    description: "Insulated cooler for outdoor adventures",
    price: 299.99,
    category: "Sports",
    image: "https://images.pexels.com/photos/1105766/pexels-photo-1105766.jpeg",
    brand: "YETI",
    rating: 4.8,
    reviews: 987
  },
  {
    name: "Fitbit Charge 5",
    description: "Advanced fitness tracker",
    price: 179.99,
    category: "Sports",
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg",
    brand: "Fitbit",
    rating: 4.5,
    reviews: 3421
  },
  {
    name: "Coleman Camping Tent",
    description: "4-person waterproof camping tent",
    price: 149.99,
    category: "Sports",
    image: "https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg",
    brand: "Coleman",
    rating: 4.4,
    reviews: 1876
  },
  {
    name: "Callaway Golf Clubs",
    description: "Complete golf club set",
    price: 799.99,
    category: "Sports",
    image: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg",
    brand: "Callaway",
    rating: 4.7,
    reviews: 543
  },
  {
    name: "Nike Soccer Ball",
    description: "Official size soccer ball",
    price: 39.99,
    category: "Sports",
    image: "https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg",
    brand: "Nike",
    rating: 4.6,
    reviews: 2876
  },
  {
    name: "NordicTrack Treadmill",
    description: "Folding treadmill with iFit compatibility",
    price: 1299.99,
    category: "Sports",
    image: "https://images.pexels.com/photos/4164596/pexels-photo-4164596.jpeg",
    brand: "NordicTrack",
    rating: 4.5,
    reviews: 765
  },
  {
    name: "Hydro Flask Water Bottle",
    description: "Insulated stainless steel water bottle",
    price: 44.99,
    category: "Sports",
    image: "https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg",
    brand: "Hydro Flask",
    rating: 4.8,
    reviews: 4567
  },
  {
    name: "Garmin GPS Watch",
    description: "Multi-sport GPS smartwatch",
    price: 349.99,
    category: "Sports",
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg",
    brand: "Garmin",
    rating: 4.7,
    reviews: 1234
  },
  {
    name: "Schwinn Mountain Bike",
    description: "21-speed mountain bike",
    price: 399.99,
    category: "Sports",
    image: "https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg",
    brand: "Schwinn",
    rating: 4.4,
    reviews: 987
  },
  {
    name: "TRX Suspension Trainer",
    description: "Bodyweight training system",
    price: 179.99,
    category: "Sports",
    image: "https://images.pexels.com/photos/4164596/pexels-photo-4164596.jpeg",
    brand: "TRX",
    rating: 4.6,
    reviews: 1543
  },
  {
    name: "Patagonia Backpack",
    description: "Durable hiking backpack",
    price: 129.99,
    category: "Sports",
    image: "https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg",
    brand: "Patagonia",
    rating: 4.8,
    reviews: 2109
  },
  {
    name: "Oakley Sports Sunglasses",
    description: "Performance sunglasses for athletes",
    price: 189.99,
    category: "Sports",
    image: "https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg",
    brand: "Oakley",
    rating: 4.7,
    reviews: 876
  },
  {
    name: "Yoga Mat Premium",
    description: "Non-slip yoga mat with carrying strap",
    price: 59.99,
    category: "Sports",
    image: "https://images.pexels.com/photos/4164596/pexels-photo-4164596.jpeg",
    brand: "Manduka",
    rating: 4.6,
    reviews: 1876
  },
  {
    name: "Ping Pong Paddle Set",
    description: "Professional table tennis paddle set",
    price: 89.99,
    category: "Sports",
    image: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg",
    brand: "Butterfly",
    rating: 4.5,
    reviews: 654
  },
  {
    name: "Resistance Bands Set",
    description: "Exercise resistance bands with handles",
    price: 34.99,
    category: "Sports",
    image: "https://images.pexels.com/photos/4164596/pexels-photo-4164596.jpeg",
    brand: "Bodylastics",
    rating: 4.4,
    reviews: 3456
  },
  {
    name: "ProForm Elliptical",
    description: "Compact elliptical training machine",
    price: 799.99,
    category: "Sports",
    image: "https://images.pexels.com/photos/4164596/pexels-photo-4164596.jpeg",
    brand: "ProForm",
    rating: 4.3,
    reviews: 432
  },

  // Books (20 items)
  {
    name: "The Psychology of Money",
    description: "Timeless lessons on wealth and happiness",
    price: 16.99,
    category: "Books",
    image: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg",
    brand: "Harriman House",
    rating: 4.8,
    reviews: 5678
  },
  {
    name: "Atomic Habits",
    description: "An easy way to build good habits",
    price: 14.99,
    category: "Books",
    image: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg",
    brand: "Avery",
    rating: 4.9,
    reviews: 8765
  },
  {
    name: "Becoming",
    description: "Michelle Obama's memoir",
    price: 19.99,
    category: "Books",
    image: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg",
    brand: "Crown",
    rating: 4.7,
    reviews: 4321
  },
  {
    name: "The Alchemist",
    description: "Paulo Coelho's philosophical novel",
    price: 12.99,
    category: "Books",
    image: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg",
    brand: "HarperOne",
    rating: 4.6,
    reviews: 12345
  },
  {
    name: "Educated",
    description: "Tara Westover's powerful memoir",
    price: 15.99,
    category: "Books",
    image: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg",
    brand: "Random House",
    rating: 4.8,
    reviews: 3456
  },
  {
    name: "Sapiens",
    description: "A brief history of humankind",
    price: 18.99,
    category: "Books",
    image: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg",
    brand: "Harper",
    rating: 4.7,
    reviews: 6789
  },
  {
    name: "The 7 Habits",
    description: "Highly effective people principles",
    price: 17.99,
    category: "Books",
    image: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg",
    brand: "Free Press",
    rating: 4.6,
    reviews: 5432
  },
  {
    name: "Where the Crawdads Sing",
    description: "Delia Owens' bestselling novel",
    price: 13.99,
    category: "Books",
    image: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg",
    brand: "Putnam",
    rating: 4.5,
    reviews: 9876
  },
  {
    name: "Think and Grow Rich",
    description: "Napoleon Hill's success principles",
    price: 11.99,
    category: "Books",
    image: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg",
    brand: "TarcherPerigee",
    rating: 4.4,
    reviews: 2345
  },
  {
    name: "The Power of Now",
    description: "Eckhart Tolle's spiritual guide",
    price: 14.99,
    category: "Books",
    image: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg",
    brand: "New World Library",
    rating: 4.7,
    reviews: 3421
  },
  {
    name: "1984",
    description: "George Orwell's dystopian classic",
    price: 10.99,
    category: "Books",
    image: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg",
    brand: "Signet Classics",
    rating: 4.8,
    reviews: 15678
  },
  {
    name: "The Lean Startup",
    description: "How innovation creates successful businesses",
    price: 16.99,
    category: "Books",
    image: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg",
    brand: "Crown Business",
    rating: 4.5,
    reviews: 1987
  },
  {
    name: "To Kill a Mockingbird",
    description: "Harper Lee's American classic",
    price: 9.99,
    category: "Books",
    image: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg",
    brand: "Harper Perennial",
    rating: 4.9,
    reviews: 23456
  },
  {
    name: "The Great Gatsby",
    description: "F. Scott Fitzgerald's masterpiece",
    price: 8.99,
    category: "Books",
    image: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg",
    brand: "Scribner",
    rating: 4.3,
    reviews: 18765
  },
  {
    name: "Rich Dad Poor Dad",
    description: "Financial education bestseller",
    price: 15.99,
    category: "Books",
    image: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg",
    brand: "Plata Publishing",
    rating: 4.6,
    reviews: 7654
  },
  {
    name: "The Subtle Art of Not Giving a F*ck",
    description: "Mark Manson's counterintuitive approach to living",
    price: 13.99,
    category: "Books",
    image: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg",
    brand: "HarperOne",
    rating: 4.4,
    reviews: 5678
  },
  {
    name: "Dune",
    description: "Frank Herbert's science fiction epic",
    price: 17.99,
    category: "Books",
    image: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg",
    brand: "Ace",
    rating: 4.7,
    reviews: 4321
  },
  {
    name: "The Hunger Games",
    description: "Suzanne Collins' dystopian trilogy",
    price: 24.99,
    category: "Books",
    image: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg",
    brand: "Scholastic",
    rating: 4.5,
    reviews: 9876
  },
  {
    name: "Good to Great",
    description: "Jim Collins' business strategy book",
    price: 18.99,
    category: "Books",
    image: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg",
    brand: "HarperBusiness",
    rating: 4.6,
    reviews: 1432
  },
  {
    name: "The Art of War",
    description: "Sun Tzu's ancient strategy guide",
    price: 7.99,
    category: "Books",
    image: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg",
    brand: "Dover Publications",
    rating: 4.4,
    reviews: 6789
  },

  // Beauty (20 items)
  {
    name: "Fenty Beauty Foundation",
    description: "Full coverage liquid foundation",
    price: 39.99,
    category: "Beauty",
    image: "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg",
    brand: "Fenty Beauty",
    rating: 4.8,
    reviews: 3456
  },
  {
    name: "Dyson Airwrap",
    description: "Multi-styler for hair styling",
    price: 599.99,
    category: "Beauty",
    image: "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg",
    brand: "Dyson",
    rating: 4.7,
    reviews: 1234
  },
  {
    name: "Charlotte Tilbury Lipstick",
    description: "Matte revolution lipstick",
    price: 37.99,
    category: "Beauty",
    image: "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg",
    brand: "Charlotte Tilbury",
    rating: 4.9,
    reviews: 2876
  },
  {
    name: "The Ordinary Retinol",
    description: "Anti-aging retinol serum",
    price: 6.99,
    category: "Beauty",
    image: "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg",
    brand: "The Ordinary",
    rating: 4.6,
    reviews: 5678
  },
  {
    name: "Glossier Cloud Paint",
    description: "Gel-cream blush",
    price: 22.99,
    category: "Beauty",
    image: "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg",
    brand: "Glossier",
    rating: 4.5,
    reviews: 1876
  },
  {
    name: "CeraVe Moisturizer",
    description: "Daily facial moisturizing lotion",
    price: 16.99,
    category: "Beauty",
    image: "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg",
    brand: "CeraVe",
    rating: 4.7,
    reviews: 4321
  },
  {
    name: "Rare Beauty Concealer",
    description: "Liquid concealer with full coverage",
    price: 21.99,
    category: "Beauty",
    image: "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg",
    brand: "Rare Beauty",
    rating: 4.6,
    reviews: 2345
  },
  {
    name: "Tatcha Water Cream",
    description: "Oil-free pore refining moisturizer",
    price: 68.99,
    category: "Beauty",
    image: "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg",
    brand: "Tatcha",
    rating: 4.8,
    reviews: 987
  },
  {
    name: "Urban Decay Eyeshadow",
    description: "Naked3 eyeshadow palette",
    price: 54.99,
    category: "Beauty",
    image: "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg",
    brand: "Urban Decay",
    rating: 4.7,
    reviews: 1543
  },
  {
    name: "Drunk Elephant Vitamin C",
    description: "Brightening vitamin C serum",
    price: 80.99,
    category: "Beauty",
    image: "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg",
    brand: "Drunk Elephant",
    rating: 4.5,
    reviews: 2109
  },
  {
    name: "Olaplex Hair Treatment",
    description: "Bond building hair treatment",
    price: 28.99,
    category: "Beauty",
    image: "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg",
    brand: "Olaplex",
    rating: 4.8,
    reviews: 3456
  },
  {
    name: "Benefit Mascara",
    description: "Lengthening and volumizing mascara",
    price: 27.99,
    category: "Beauty",
    image: "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg",
    brand: "Benefit",
    rating: 4.6,
    reviews: 1876
  },
  {
    name: "Laneige Lip Mask",
    description: "Overnight lip sleeping mask",
    price: 22.99,
    category: "Beauty",
    image: "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg",
    brand: "Laneige",
    rating: 4.7,
    reviews: 2876
  },
  {
    name: "Neutrogena Sunscreen",
    description: "SPF 55 ultra sheer dry-touch sunscreen",
    price: 11.99,
    category: "Beauty",
    image: "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg",
    brand: "Neutrogena",
    rating: 4.4,
    reviews: 6789
  },
  {
    name: "Foreo Luna Mini",
    description: "Facial cleansing brush",
    price: 139.99,
    category: "Beauty",
    image: "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg",
    brand: "Foreo",
    rating: 4.6,
    reviews: 765
  },
  {
    name: "Paula's Choice BHA",
    description: "2% BHA liquid exfoliant",
    price: 32.99,
    category: "Beauty",
    image: "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg",
    brand: "Paula's Choice",
    rating: 4.8,
    reviews: 4567
  },
  {
    name: "MAC Ruby Woo Lipstick",
    description: "Classic red matte lipstick",
    price: 24.99,
    category: "Beauty",
    image: "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg",
    brand: "MAC",
    rating: 4.7,
    reviews: 3421
  },
  {
    name: "Clinique Dramatically Different Moisturizer",
    description: "Daily hydrating lotion",
    price: 29.99,
    category: "Beauty",
    image: "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg",
    brand: "Clinique",
    rating: 4.5,
    reviews: 2345
  },
  {
    name: "Estée Lauder Night Repair",
    description: "Advanced night repair serum",
    price: 105.99,
    category: "Beauty",
    image: "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg",
    brand: "Estée Lauder",
    rating: 4.8,
    reviews: 1234
  },
  {
    name: "Maybelline Great Lash",
    description: "Classic washable mascara",
    price: 5.99,
    category: "Beauty",
    image: "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg",
    brand: "Maybelline",
    rating: 4.3,
    reviews: 8765
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing items
    await Item.deleteMany({});
    console.log('Cleared existing items');

    // Insert new items
    await Item.insertMany(seedItems);
    console.log('✅ Successfully seeded 100 items across 6 categories');
    
    // Display summary
    const categories = await Item.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
    
    console.log('\n📊 Items by Category:');
    categories.forEach(cat => {
      console.log(`  ${cat._id}: ${cat.count} items`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();