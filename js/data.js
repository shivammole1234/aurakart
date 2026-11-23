// ============================================================================
// BUYHATKE MASTER DATA ENGINE & SIMULATION CATALOG
// ============================================================================

window.BH_DATA = {
  // 1. GROCERY CATALOG
  groceries: [
    {
      id: 'g1',
      name: 'Amul Taaza Fresh Toned Milk',
      weight: '500 ml',
      category: 'Dairy & Milk',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&q=80',
      description: 'Pasteurised toned milk with 3% fat and 8.5% SNF',
      stores: {
        blinkit: { price: 27, originalPrice: 27, inStock: true, eta: '11 mins', deliveryFee: 15, handlingFee: 4 },
        zepto: { price: 26, originalPrice: 27, inStock: true, eta: '8 mins', deliveryFee: 0, handlingFee: 5 },
        instamart: { price: 27, originalPrice: 27, inStock: true, eta: '14 mins', deliveryFee: 19, handlingFee: 4 },
        bigbasket: { price: 27, originalPrice: 27, inStock: true, eta: '25 mins', deliveryFee: 30, handlingFee: 0 }
      }
    },
    {
      id: 'g2',
      name: 'Coca-Cola Zero Sugar Can',
      weight: '300 ml',
      category: 'Beverages',
      image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300&q=80',
      description: 'Zero calories, zero sugar, classic refreshing taste',
      stores: {
        blinkit: { price: 40, originalPrice: 40, inStock: true, eta: '11 mins', deliveryFee: 15, handlingFee: 4 },
        zepto: { price: 38, originalPrice: 40, inStock: true, eta: '8 mins', deliveryFee: 0, handlingFee: 5 },
        instamart: { price: 39, originalPrice: 40, inStock: true, eta: '14 mins', deliveryFee: 19, handlingFee: 4 },
        bigbasket: { price: 40, originalPrice: 40, inStock: true, eta: '25 mins', deliveryFee: 30, handlingFee: 0 }
      }
    },
    {
      id: 'g3',
      name: 'Fortune Sunlite Refined Sunflower Oil',
      weight: '1 Litre',
      category: 'Cooking Essentials',
      image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&q=80',
      description: 'Enriched with Vitamin A and D for healthy cooking',
      stores: {
        blinkit: { price: 145, originalPrice: 175, inStock: true, eta: '11 mins', deliveryFee: 15, handlingFee: 4 },
        zepto: { price: 139, originalPrice: 175, inStock: true, eta: '8 mins', deliveryFee: 0, handlingFee: 5 },
        instamart: { price: 142, originalPrice: 175, inStock: true, eta: '14 mins', deliveryFee: 19, handlingFee: 4 },
        bigbasket: { price: 148, originalPrice: 175, inStock: true, eta: '25 mins', deliveryFee: 30, handlingFee: 0 }
      }
    },
    {
      id: 'g4',
      name: 'Aashirvaad Superior MP Sharbati Atta',
      weight: '5 kg',
      category: 'Flours & Grains',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&q=80',
      description: '100% pure whole wheat chakki atta for soft rotis',
      stores: {
        blinkit: { price: 295, originalPrice: 320, inStock: true, eta: '11 mins', deliveryFee: 15, handlingFee: 4 },
        zepto: { price: 289, originalPrice: 320, inStock: true, eta: '8 mins', deliveryFee: 0, handlingFee: 5 },
        instamart: { price: 299, originalPrice: 320, inStock: true, eta: '14 mins', deliveryFee: 19, handlingFee: 4 },
        bigbasket: { price: 290, originalPrice: 320, inStock: true, eta: '25 mins', deliveryFee: 30, handlingFee: 0 }
      }
    },
    {
      id: 'g5',
      name: 'Fresh Red Onions (Pyaaz)',
      weight: '1 kg',
      category: 'Fresh Vegetables',
      image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=300&q=80',
      description: 'Farm-fresh premium quality red onions',
      stores: {
        blinkit: { price: 38, originalPrice: 50, inStock: true, eta: '11 mins', deliveryFee: 15, handlingFee: 4 },
        zepto: { price: 34, originalPrice: 50, inStock: true, eta: '8 mins', deliveryFee: 0, handlingFee: 5 },
        instamart: { price: 36, originalPrice: 50, inStock: true, eta: '14 mins', deliveryFee: 19, handlingFee: 4 },
        bigbasket: { price: 35, originalPrice: 50, inStock: true, eta: '25 mins', deliveryFee: 30, handlingFee: 0 }
      }
    },
    {
      id: 'g6',
      name: 'Britannia 100% Whole Wheat Bread',
      weight: '400 g',
      category: 'Bakery & Bread',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&q=80',
      description: 'Zero maida, rich in fiber for wholesome nutrition',
      stores: {
        blinkit: { price: 50, originalPrice: 55, inStock: true, eta: '11 mins', deliveryFee: 15, handlingFee: 4 },
        zepto: { price: 48, originalPrice: 55, inStock: true, eta: '8 mins', deliveryFee: 0, handlingFee: 5 },
        instamart: { price: 50, originalPrice: 55, inStock: true, eta: '14 mins', deliveryFee: 19, handlingFee: 4 },
        bigbasket: { price: 52, originalPrice: 55, inStock: true, eta: '25 mins', deliveryFee: 30, handlingFee: 0 }
      }
    },
    {
      id: 'g7',
      name: 'Maggi 2-Minute Instant Noodles',
      weight: 'Pack of 4 (280g)',
      category: 'Snacks & Instant Food',
      image: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?w=300&q=80',
      description: 'Classic masala taste with goodness of iron',
      stores: {
        blinkit: { price: 56, originalPrice: 60, inStock: true, eta: '11 mins', deliveryFee: 15, handlingFee: 4 },
        zepto: { price: 54, originalPrice: 60, inStock: true, eta: '8 mins', deliveryFee: 0, handlingFee: 5 },
        instamart: { price: 55, originalPrice: 60, inStock: true, eta: '14 mins', deliveryFee: 19, handlingFee: 4 },
        bigbasket: { price: 56, originalPrice: 60, inStock: true, eta: '25 mins', deliveryFee: 30, handlingFee: 0 }
      }
    },
    {
      id: 'g8',
      name: 'Cadbury Dairy Milk Silk Chocolate Bar',
      weight: '150 g',
      category: 'Chocolates & Sweets',
      image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=300&q=80',
      description: 'Velvety smooth and creamiest milk chocolate bar',
      stores: {
        blinkit: { price: 175, originalPrice: 190, inStock: true, eta: '11 mins', deliveryFee: 15, handlingFee: 4 },
        zepto: { price: 165, originalPrice: 190, inStock: true, eta: '8 mins', deliveryFee: 0, handlingFee: 5 },
        instamart: { price: 170, originalPrice: 190, inStock: true, eta: '14 mins', deliveryFee: 19, handlingFee: 4 },
        bigbasket: { price: 172, originalPrice: 190, inStock: true, eta: '25 mins', deliveryFee: 30, handlingFee: 0 }
      }
    },
    {
      id: 'g9',
      name: 'Amul Pure Cow Ghee Tin',
      weight: '1 Litre',
      category: 'Cooking Essentials',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&q=80',
      description: 'Traditional aroma and rich taste made from pure milk fat',
      stores: {
        blinkit: { price: 615, originalPrice: 650, inStock: true, eta: '11 mins', deliveryFee: 15, handlingFee: 4 },
        zepto: { price: 599, originalPrice: 650, inStock: true, eta: '8 mins', deliveryFee: 0, handlingFee: 5 },
        instamart: { price: 610, originalPrice: 650, inStock: true, eta: '14 mins', deliveryFee: 19, handlingFee: 4 },
        bigbasket: { price: 595, originalPrice: 650, inStock: true, eta: '25 mins', deliveryFee: 30, handlingFee: 0 }
      }
    },
    {
      id: 'g10',
      name: 'Mother Dairy Classic Malai Paneer',
      weight: '200 g',
      category: 'Dairy & Milk',
      image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=300&q=80',
      description: 'Super soft, protein-rich fresh cottage cheese',
      stores: {
        blinkit: { price: 90, originalPrice: 95, inStock: true, eta: '11 mins', deliveryFee: 15, handlingFee: 4 },
        zepto: { price: 88, originalPrice: 95, inStock: true, eta: '8 mins', deliveryFee: 0, handlingFee: 5 },
        instamart: { price: 92, originalPrice: 95, inStock: true, eta: '14 mins', deliveryFee: 19, handlingFee: 4 },
        bigbasket: { price: 89, originalPrice: 95, inStock: true, eta: '25 mins', deliveryFee: 30, handlingFee: 0 }
      }
    },
    {
      id: 'g11',
      name: 'Farm Fresh White Eggs',
      weight: 'Pack of 6',
      category: 'Dairy & Milk',
      image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=300&q=80',
      description: 'Hygienically sorted, clean farm fresh protein eggs',
      stores: {
        blinkit: { price: 52, originalPrice: 60, inStock: true, eta: '11 mins', deliveryFee: 15, handlingFee: 4 },
        zepto: { price: 49, originalPrice: 60, inStock: true, eta: '8 mins', deliveryFee: 0, handlingFee: 5 },
        instamart: { price: 50, originalPrice: 60, inStock: true, eta: '14 mins', deliveryFee: 19, handlingFee: 4 },
        bigbasket: { price: 48, originalPrice: 60, inStock: true, eta: '25 mins', deliveryFee: 30, handlingFee: 0 }
      }
    },
    {
      id: 'g12',
      name: 'Amul Pasteurized Butter',
      weight: '500 g',
      category: 'Dairy & Milk',
      image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300&q=80',
      description: 'Utterly butterly delicious classic salted butter',
      stores: {
        blinkit: { price: 265, originalPrice: 275, inStock: true, eta: '11 mins', deliveryFee: 15, handlingFee: 4 },
        zepto: { price: 260, originalPrice: 275, inStock: true, eta: '8 mins', deliveryFee: 0, handlingFee: 5 },
        instamart: { price: 268, originalPrice: 275, inStock: true, eta: '14 mins', deliveryFee: 19, handlingFee: 4 },
        bigbasket: { price: 262, originalPrice: 275, inStock: true, eta: '25 mins', deliveryFee: 30, handlingFee: 0 }
      }
    },
    {
      id: 'g13',
      name: 'Nandini Pure Fresh Dahi / Curd',
      weight: '400 g',
      category: 'Dairy & Milk',
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&q=80',
      description: 'Thick, creamy and delicious natural set curd',
      stores: {
        blinkit: { price: 32, originalPrice: 32, inStock: true, eta: '11 mins', deliveryFee: 15, handlingFee: 4 },
        zepto: { price: 30, originalPrice: 32, inStock: true, eta: '8 mins', deliveryFee: 0, handlingFee: 5 },
        instamart: { price: 32, originalPrice: 32, inStock: true, eta: '14 mins', deliveryFee: 19, handlingFee: 4 },
        bigbasket: { price: 30, originalPrice: 32, inStock: true, eta: '25 mins', deliveryFee: 30, handlingFee: 0 }
      }
    },
    {
      id: 'g14',
      name: 'Fresh Hybrid Tomatoes (Tamatar)',
      weight: '1 kg',
      category: 'Fresh Vegetables',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&q=80',
      description: 'Firm, juicy and naturally ripened farm tomatoes',
      stores: {
        blinkit: { price: 32, originalPrice: 40, inStock: true, eta: '11 mins', deliveryFee: 15, handlingFee: 4 },
        zepto: { price: 28, originalPrice: 40, inStock: true, eta: '8 mins', deliveryFee: 0, handlingFee: 5 },
        instamart: { price: 30, originalPrice: 40, inStock: true, eta: '14 mins', deliveryFee: 19, handlingFee: 4 },
        bigbasket: { price: 29, originalPrice: 40, inStock: true, eta: '25 mins', deliveryFee: 30, handlingFee: 0 }
      }
    },
    {
      id: 'g15',
      name: 'Fresh Baby Potatoes (Aloo)',
      weight: '1 kg',
      category: 'Fresh Vegetables',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&q=80',
      description: 'Nutritious unpolished daily cooking potatoes',
      stores: {
        blinkit: { price: 36, originalPrice: 45, inStock: true, eta: '11 mins', deliveryFee: 15, handlingFee: 4 },
        zepto: { price: 32, originalPrice: 45, inStock: true, eta: '8 mins', deliveryFee: 0, handlingFee: 5 },
        instamart: { price: 35, originalPrice: 45, inStock: true, eta: '14 mins', deliveryFee: 19, handlingFee: 4 },
        bigbasket: { price: 34, originalPrice: 45, inStock: true, eta: '25 mins', deliveryFee: 30, handlingFee: 0 }
      }
    },
    {
      id: 'g16',
      name: 'Fresh Green Coriander & Chillies Bunch',
      weight: '150 g',
      category: 'Fresh Vegetables',
      image: 'https://images.unsplash.com/photo-1599818816942-e1d51c14bbef?w=300&q=80',
      description: 'Crisp spicy green chillies with fragrant coriander leaves',
      stores: {
        blinkit: { price: 18, originalPrice: 25, inStock: true, eta: '11 mins', deliveryFee: 15, handlingFee: 4 },
        zepto: { price: 15, originalPrice: 25, inStock: true, eta: '8 mins', deliveryFee: 0, handlingFee: 5 },
        instamart: { price: 16, originalPrice: 25, inStock: true, eta: '14 mins', deliveryFee: 19, handlingFee: 4 },
        bigbasket: { price: 15, originalPrice: 25, inStock: true, eta: '25 mins', deliveryFee: 30, handlingFee: 0 }
      }
    },
    {
      id: 'g17',
      name: 'Shimla Royal Gala Red Apples',
      weight: '4 pcs (500g)',
      category: 'Fresh Fruits',
      image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&q=80',
      description: 'Crisp, sweet and juicy premium orchard apples',
      stores: {
        blinkit: { price: 139, originalPrice: 160, inStock: true, eta: '11 mins', deliveryFee: 15, handlingFee: 4 },
        zepto: { price: 129, originalPrice: 160, inStock: true, eta: '8 mins', deliveryFee: 0, handlingFee: 5 },
        instamart: { price: 135, originalPrice: 160, inStock: true, eta: '14 mins', deliveryFee: 19, handlingFee: 4 },
        bigbasket: { price: 130, originalPrice: 160, inStock: true, eta: '25 mins', deliveryFee: 30, handlingFee: 0 }
      }
    },
    {
      id: 'g18',
      name: 'Fresh Robusta Ripe Bananas',
      weight: 'Pack of 6',
      category: 'Fresh Fruits',
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&q=80',
      description: 'Naturally sweetened, rich in potassium and energy',
      stores: {
        blinkit: { price: 42, originalPrice: 55, inStock: true, eta: '11 mins', deliveryFee: 15, handlingFee: 4 },
        zepto: { price: 39, originalPrice: 55, inStock: true, eta: '8 mins', deliveryFee: 0, handlingFee: 5 },
        instamart: { price: 40, originalPrice: 55, inStock: true, eta: '14 mins', deliveryFee: 19, handlingFee: 4 },
        bigbasket: { price: 38, originalPrice: 55, inStock: true, eta: '25 mins', deliveryFee: 30, handlingFee: 0 }
      }
    },
    {
      id: 'g19',
      name: 'Daawat Rozana Super Basmati Rice',
      weight: '5 kg',
      category: 'Flours & Grains',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&q=80',
      description: 'Long grain, non-sticky aromatic basmati rice',
      stores: {
        blinkit: { price: 395, originalPrice: 450, inStock: true, eta: '11 mins', deliveryFee: 15, handlingFee: 4 },
        zepto: { price: 379, originalPrice: 450, inStock: true, eta: '8 mins', deliveryFee: 0, handlingFee: 5 },
        instamart: { price: 389, originalPrice: 450, inStock: true, eta: '14 mins', deliveryFee: 19, handlingFee: 4 },
        bigbasket: { price: 375, originalPrice: 450, inStock: true, eta: '25 mins', deliveryFee: 30, handlingFee: 0 }
      }
    },
    {
      id: 'g20',
      name: 'Tata Sampann Unpolished Toor Dal',
      weight: '1 kg',
      category: 'Flours & Grains',
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&q=80',
      description: 'Wholesome unpolished arhar dal with natural protein',
      stores: {
        blinkit: { price: 172, originalPrice: 195, inStock: true, eta: '11 mins', deliveryFee: 15, handlingFee: 4 },
        zepto: { price: 165, originalPrice: 195, inStock: true, eta: '8 mins', deliveryFee: 0, handlingFee: 5 },
        instamart: { price: 170, originalPrice: 195, inStock: true, eta: '14 mins', deliveryFee: 19, handlingFee: 4 },
        bigbasket: { price: 168, originalPrice: 195, inStock: true, eta: '25 mins', deliveryFee: 30, handlingFee: 0 }
      }
    },
    {
      id: 'g21',
      name: 'Tata Vacuum Evaporated Iodized Salt',
      weight: '1 kg',
      category: 'Cooking Essentials',
      image: 'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=300&q=80',
      description: 'Desh ka namak with guaranteed iodine purity',
      stores: {
        blinkit: { price: 26, originalPrice: 28, inStock: true, eta: '11 mins', deliveryFee: 15, handlingFee: 4 },
        zepto: { price: 25, originalPrice: 28, inStock: true, eta: '8 mins', deliveryFee: 0, handlingFee: 5 },
        instamart: { price: 26, originalPrice: 28, inStock: true, eta: '14 mins', deliveryFee: 19, handlingFee: 4 },
        bigbasket: { price: 25, originalPrice: 28, inStock: true, eta: '25 mins', deliveryFee: 30, handlingFee: 0 }
      }
    },
    {
      id: 'g22',
      name: 'Brooke Bond Red Label Strong Tea',
      weight: '500 g',
      category: 'Beverages',
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=300&q=80',
      description: 'Rich taste and color blended with quality tea leaves',
      stores: {
        blinkit: { price: 269, originalPrice: 310, inStock: true, eta: '11 mins', deliveryFee: 15, handlingFee: 4 },
        zepto: { price: 259, originalPrice: 310, inStock: true, eta: '8 mins', deliveryFee: 0, handlingFee: 5 },
        instamart: { price: 265, originalPrice: 310, inStock: true, eta: '14 mins', deliveryFee: 19, handlingFee: 4 },
        bigbasket: { price: 255, originalPrice: 310, inStock: true, eta: '25 mins', deliveryFee: 30, handlingFee: 0 }
      }
    },
    {
      id: 'g23',
      name: 'Nescafe Classic Instant Coffee Jar',
      weight: '100 g',
      category: 'Beverages',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=300&q=80',
      description: '100% pure robusta coffee with rich bold aroma',
      stores: {
        blinkit: { price: 345, originalPrice: 390, inStock: true, eta: '11 mins', deliveryFee: 15, handlingFee: 4 },
        zepto: { price: 335, originalPrice: 390, inStock: true, eta: '8 mins', deliveryFee: 0, handlingFee: 5 },
        instamart: { price: 340, originalPrice: 390, inStock: true, eta: '14 mins', deliveryFee: 19, handlingFee: 4 },
        bigbasket: { price: 330, originalPrice: 390, inStock: true, eta: '25 mins', deliveryFee: 30, handlingFee: 0 }
      }
    },
    {
      id: 'g24',
      name: "Lay's India's Magic Masala Chips",
      weight: 'Pack of 2 (90g)',
      category: 'Snacks & Instant Food',
      image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&q=80',
      description: 'Crispy crunchy potato chips sprinkled with Indian spices',
      stores: {
        blinkit: { price: 48, originalPrice: 50, inStock: true, eta: '11 mins', deliveryFee: 15, handlingFee: 4 },
        zepto: { price: 45, originalPrice: 50, inStock: true, eta: '8 mins', deliveryFee: 0, handlingFee: 5 },
        instamart: { price: 46, originalPrice: 50, inStock: true, eta: '14 mins', deliveryFee: 19, handlingFee: 4 },
        bigbasket: { price: 45, originalPrice: 50, inStock: true, eta: '25 mins', deliveryFee: 30, handlingFee: 0 }
      }
    },
    {
      id: 'g25',
      name: "Haldiram's Nagpur Aloo Bhujia Sev",
      weight: '400 g',
      category: 'Snacks & Instant Food',
      image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=300&q=80',
      description: 'Spicy minty potato noodles snack seasoned to perfection',
      stores: {
        blinkit: { price: 105, originalPrice: 120, inStock: true, eta: '11 mins', deliveryFee: 15, handlingFee: 4 },
        zepto: { price: 99, originalPrice: 120, inStock: true, eta: '8 mins', deliveryFee: 0, handlingFee: 5 },
        instamart: { price: 102, originalPrice: 120, inStock: true, eta: '14 mins', deliveryFee: 19, handlingFee: 4 },
        bigbasket: { price: 98, originalPrice: 120, inStock: true, eta: '25 mins', deliveryFee: 30, handlingFee: 0 }
      }
    },
    {
      id: 'g26',
      name: 'Surf Excel Matic Front Load Liquid',
      weight: '1 Litre',
      category: 'Cleaning & Household',
      image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=300&q=80',
      description: 'Tough stain removal in washing machine with fresh fragrance',
      stores: {
        blinkit: { price: 215, originalPrice: 240, inStock: true, eta: '11 mins', deliveryFee: 15, handlingFee: 4 },
        zepto: { price: 205, originalPrice: 240, inStock: true, eta: '8 mins', deliveryFee: 0, handlingFee: 5 },
        instamart: { price: 210, originalPrice: 240, inStock: true, eta: '14 mins', deliveryFee: 19, handlingFee: 4 },
        bigbasket: { price: 200, originalPrice: 240, inStock: true, eta: '25 mins', deliveryFee: 30, handlingFee: 0 }
      }
    }
  ],

  // 2. CAB ROUTES & VEHICLE COMPARISON DATA
  cabRoutes: [
    {
      id: 'route_blr_airport',
      name: 'Koramangala 4th Block → BLR Airport (Kempegowda)',
      pickup: 'Koramangala 4th Block, Bengaluru',
      drop: 'Kempegowda International Airport (BLR), Bengaluru',
      distanceKm: 38.5,
      durationMins: 62,
      baseMultiplier: 1.0
    },
    {
      id: 'route_blr_indiranagar',
      name: 'HSR Layout Sector 1 → 100 Feet Rd, Indiranagar',
      pickup: 'HSR Layout Sector 1, Bengaluru',
      drop: '100 Feet Rd, Indiranagar, Bengaluru',
      distanceKm: 10.4,
      durationMins: 26,
      baseMultiplier: 0.95
    },
    {
      id: 'route_blr_mgroad',
      name: 'Whitefield ITPL → MG Road Metro Station',
      pickup: 'ITPL Main Road, Whitefield, Bengaluru',
      drop: 'MG Road Metro Station, Bengaluru',
      distanceKm: 17.2,
      durationMins: 48,
      baseMultiplier: 1.15
    },
    {
      id: 'route_del_cybercity',
      name: 'Connaught Place → Cyber City, Gurugram',
      pickup: 'Connaught Place, Inner Circle, New Delhi',
      drop: 'DLF Cyber City, Phase 2, Gurugram',
      distanceKm: 27.8,
      durationMins: 52,
      baseMultiplier: 1.05
    },
    {
      id: 'route_bom_bkc',
      name: 'Andheri West → Bandra Kurla Complex (BKC)',
      pickup: 'Lokhandwala, Andheri West, Mumbai',
      drop: 'Bandra Kurla Complex (BKC), Mumbai',
      distanceKm: 14.6,
      durationMins: 40,
      baseMultiplier: 1.2
    }
  ],

  cabProviders: [
    {
      id: 'uber',
      name: 'Uber',
      icon: 'assets/icons/uber.svg',
      brandColor: '#000000',
      accountLinked: true,
      options: [
        { type: 'moto', label: 'Uber Moto', capacity: '1 Person', eta: 3, basePerKm: 7.5, surge: 1.0, icon: '🏍️' },
        { type: 'auto', label: 'Uber Auto', capacity: '3 People', eta: 4, basePerKm: 14.0, surge: 1.1, icon: '🛺' },
        { type: 'mini', label: 'Uber Go', capacity: '4 People', eta: 5, basePerKm: 18.5, surge: 1.15, icon: '🚗' },
        { type: 'sedan', label: 'Uber Premier', capacity: '4 People', eta: 6, basePerKm: 24.0, surge: 1.0, icon: '🚘' },
        { type: 'suv', label: 'Uber XL', capacity: '6 People', eta: 8, basePerKm: 32.0, surge: 1.2, icon: '🚐' }
      ]
    },
    {
      id: 'ola',
      name: 'Ola',
      icon: 'assets/icons/ola.svg',
      brandColor: '#00D09C',
      accountLinked: true,
      options: [
        { type: 'moto', label: 'Ola Bike', capacity: '1 Person', eta: 4, basePerKm: 7.2, surge: 1.0, icon: '🏍️' },
        { type: 'auto', label: 'Ola Auto', capacity: '3 People', eta: 5, basePerKm: 13.8, surge: 1.05, icon: '🛺' },
        { type: 'mini', label: 'Ola Mini', capacity: '4 People', eta: 7, basePerKm: 19.2, surge: 1.25, icon: '🚗' },
        { type: 'sedan', label: 'Ola Prime Sedan', capacity: '4 People', eta: 8, basePerKm: 25.0, surge: 1.1, icon: '🚘' },
        { type: 'suv', label: 'Ola Prime Plus', capacity: '6 People', eta: 10, basePerKm: 34.0, surge: 1.15, icon: '🚐' }
      ]
    },
    {
      id: 'rapido',
      name: 'Rapido',
      icon: 'assets/icons/rapido.svg',
      brandColor: '#F9D100',
      accountLinked: false,
      options: [
        { type: 'moto', label: 'Rapido Bike', capacity: '1 Person', eta: 2, basePerKm: 6.8, surge: 1.0, icon: '🏍️' },
        { type: 'auto', label: 'Rapido Auto', capacity: '3 People', eta: 4, basePerKm: 13.0, surge: 1.0, icon: '🛺' },
        { type: 'mini', label: 'Rapido Economy Cab', capacity: '4 People', eta: 6, basePerKm: 17.8, surge: 1.0, icon: '🚗' }
      ]
    },
    {
      id: 'nammayatri',
      name: 'Namma Yatri',
      icon: 'assets/icons/nammayatri.svg',
      brandColor: '#FFBB00',
      accountLinked: false,
      options: [
        { type: 'auto', label: 'Namma Yatri Auto (Zero Surge)', capacity: '3 People', eta: 6, basePerKm: 12.5, surge: 1.0, icon: '🛺' },
        { type: 'mini', label: 'Namma Yatri Non-AC Cab', capacity: '4 People', eta: 9, basePerKm: 16.5, surge: 1.0, icon: '🚗' }
      ]
    }
  ],

  // 3. FLIGHT COMPARISON ROUTES & DATA
  flightRoutes: [
    {
      id: 'DEL-BOM',
      fromCode: 'DEL',
      fromCity: 'New Delhi (DEL)',
      toCode: 'BOM',
      toCity: 'Mumbai (BOM)',
      flights: [
        {
          id: 'FL-6E204',
          airline: 'IndiGo',
          flightNo: '6E-2041',
          icon: 'assets/icons/indigo.svg',
          depTime: '06:00',
          arrTime: '08:15',
          duration: '2h 15m',
          stops: 'Non-stop',
          prices: {
            makemytrip: { base: 4950, promo: 'MMTBEST', discount: 450, final: 4500 },
            cleartrip: { base: 4980, promo: 'CTFLY', discount: 380, final: 4600 },
            easemytrip: { base: 4920, promo: 'EMTBONUS', discount: 520, final: 4400 },
            indigo: { base: 4890, promo: 'DIRECT6E', discount: 200, final: 4690 }
          }
        },
        {
          id: 'FL-AI805',
          airline: 'Air India',
          flightNo: 'AI-805',
          icon: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=100&q=80',
          depTime: '08:30',
          arrTime: '10:50',
          duration: '2h 20m',
          stops: 'Non-stop',
          prices: {
            makemytrip: { base: 5400, promo: 'MMTAI', discount: 500, final: 4900 },
            cleartrip: { base: 5450, promo: 'CTAIR', discount: 600, final: 4850 },
            easemytrip: { base: 5350, promo: 'EMTFLY', discount: 550, final: 4800 },
            indigo: { base: 5600, promo: '-', discount: 0, final: 5600 }
          }
        },
        {
          id: 'FL-QP112',
          airline: 'Akasa Air',
          flightNo: 'QP-1124',
          icon: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=100&q=80',
          depTime: '14:15',
          arrTime: '16:35',
          duration: '2h 20m',
          stops: 'Non-stop',
          prices: {
            makemytrip: { base: 4400, promo: 'MMTAKASA', discount: 350, final: 4050 },
            cleartrip: { base: 4380, promo: 'CTSPECIAL', discount: 400, final: 3980 },
            easemytrip: { base: 4350, promo: 'EMTCHEAP', discount: 450, final: 3900 },
            indigo: { base: 4600, promo: '-', discount: 0, final: 4600 }
          }
        }
      ]
    },
    {
      id: 'BLR-DEL',
      fromCode: 'BLR',
      fromCity: 'Bengaluru (BLR)',
      toCode: 'DEL',
      toCity: 'New Delhi (DEL)',
      flights: [
        {
          id: 'FL-6E508',
          airline: 'IndiGo',
          flightNo: '6E-5082',
          icon: 'assets/icons/indigo.svg',
          depTime: '07:15',
          arrTime: '10:05',
          duration: '2h 50m',
          stops: 'Non-stop',
          prices: {
            makemytrip: { base: 5900, promo: 'MMTSAVE', discount: 600, final: 5300 },
            cleartrip: { base: 5950, promo: 'CTBLR', discount: 500, final: 5450 },
            easemytrip: { base: 5850, promo: 'EMTBLR', discount: 700, final: 5150 },
            indigo: { base: 5800, promo: 'INDIGO6E', discount: 300, final: 5500 }
          }
        },
        {
          id: 'FL-UK814',
          airline: 'Vistara',
          flightNo: 'UK-814',
          icon: 'https://images.unsplash.com/photo-1520437358207-323b43b50729?w=100&q=80',
          depTime: '18:40',
          arrTime: '21:30',
          duration: '2h 50m',
          stops: 'Non-stop',
          prices: {
            makemytrip: { base: 6800, promo: 'MMTFLY', discount: 800, final: 6000 },
            cleartrip: { base: 6750, promo: 'CTVISTARA', discount: 750, final: 6000 },
            easemytrip: { base: 6700, promo: 'EMTSAVER', discount: 850, final: 5850 },
            indigo: { base: 7100, promo: '-', discount: 0, final: 7100 }
          }
        }
      ]
    },
    {
      id: 'BOM-GOI',
      fromCode: 'BOM',
      fromCity: 'Mumbai (BOM)',
      toCode: 'GOI',
      toCity: 'Goa Dabolim (GOI)',
      flights: [
        {
          id: 'FL-6E341',
          airline: 'IndiGo',
          flightNo: '6E-341',
          icon: 'assets/icons/indigo.svg',
          depTime: '11:20',
          arrTime: '12:35',
          duration: '1h 15m',
          stops: 'Non-stop',
          prices: {
            makemytrip: { base: 3100, promo: 'MMTGOA', discount: 350, final: 2750 },
            cleartrip: { base: 3150, promo: 'CTBEACH', discount: 400, final: 2750 },
            easemytrip: { base: 3050, promo: 'EMTGOA', discount: 450, final: 2600 },
            indigo: { base: 3000, promo: 'DIRECT', discount: 150, final: 2850 }
          }
        }
      ]
    }
  ],

  // 4. SHOPPING & ELECTRONICS COMPARISON + 90-DAY PRICE GRAPH DATA
  products: [
    {
      id: 'p1',
      name: 'Apple iPhone 16 (128 GB) - Ultramarine',
      category: 'Smartphones',
      image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&q=80',
      specs: 'A18 Bionic Chip, Camera Control, 48MP Fusion Camera, Super Retina XDR OLED',
      mrp: 79900,
      lowestEver: 72999,
      highestEver: 79900,
      averagePrice: 76499,
      verdict: '🔥 Good Deal! ₹4,400 below average. Lowest in 30 days.',
      history: [
        { day: 'Day 90', price: 79900 },
        { day: 'Day 75', price: 79900 },
        { day: 'Day 60', price: 78499 },
        { day: 'Day 45', price: 77999 },
        { day: 'Day 30', price: 76999 },
        { day: 'Day 15', price: 74999 },
        { day: 'Today', price: 73999 }
      ],
      stores: {
        amazon: { price: 74999, link: 'https://amazon.in/dp/B0DFX76', rating: 4.6, reviews: 1420, delivery: 'Tomorrow, Free', coupon: 'FLAT ₹4,000 ICICI Card' },
        flipkart: { price: 73999, link: 'https://flipkart.com/apple-iphone-16', rating: 4.5, reviews: 3100, delivery: '2 Days, Free', coupon: 'FLAT ₹5,000 HDFC Card' },
        croma: { price: 75990, link: 'https://croma.com/p/iphone-16', rating: 4.4, reviews: 390, delivery: 'Same Day Store Pickup', coupon: 'Instant ₹3,500 Bank Off' },
        reliance: { price: 76900, link: 'https://reliancedigital.in/iphone-16', rating: 4.3, reviews: 210, delivery: 'Tomorrow', coupon: '₹3,000 Cashback' }
      }
    },
    {
      id: 'p2',
      name: 'Sony WH-1000XM5 Wireless ANC Headphones',
      category: 'Audio',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&q=80',
      specs: 'Industry Leading Noise Cancellation, 30hr Battery, Multipoint Bluetooth, LDAC',
      mrp: 34990,
      lowestEver: 23990,
      highestEver: 31990,
      averagePrice: 28490,
      verdict: '⚡ Lowest Ever! Great time to buy, ₹4,500 below usual price.',
      history: [
        { day: 'Day 90', price: 31990 },
        { day: 'Day 75', price: 29990 },
        { day: 'Day 60', price: 29990 },
        { day: 'Day 45', price: 27990 },
        { day: 'Day 30', price: 26990 },
        { day: 'Day 15', price: 25490 },
        { day: 'Today', price: 23990 }
      ],
      stores: {
        amazon: { price: 23990, link: 'https://amazon.in/dp/B09XS7J7', rating: 4.7, reviews: 8900, delivery: 'Tomorrow by 11 AM', coupon: 'APPLY ₹1,500 Coupon' },
        flipkart: { price: 24999, link: 'https://flipkart.com/sony-wh-1000xm5', rating: 4.6, reviews: 5200, delivery: '3 Days', coupon: '₹1,000 Axis Card' },
        croma: { price: 26990, link: 'https://croma.com/sony-xm5', rating: 4.5, reviews: 810, delivery: 'In-Store Today', coupon: '₹2,000 Off' },
        reliance: { price: 27490, link: 'https://reliancedigital.in/sony-xm5', rating: 4.4, reviews: 340, delivery: '2 Days', coupon: 'No Cost EMI' }
      }
    },
    {
      id: 'p3',
      name: 'Apple MacBook Air M3 (13-inch, 256GB SSD, 16GB Unified RAM)',
      category: 'Laptops',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80',
      specs: 'M3 8-Core CPU, 10-Core GPU, Liquid Retina Display, 18-Hour Battery Life, MagSafe 3',
      mrp: 114900,
      lowestEver: 98990,
      highestEver: 114900,
      averagePrice: 104990,
      verdict: '✅ Fair Price! ₹5,000 below average, price stable.',
      history: [
        { day: 'Day 90', price: 114900 },
        { day: 'Day 75', price: 109900 },
        { day: 'Day 60', price: 105990 },
        { day: 'Day 45', price: 104990 },
        { day: 'Day 30', price: 102990 },
        { day: 'Day 15', price: 99990 },
        { day: 'Today', price: 99990 }
      ],
      stores: {
        amazon: { price: 99990, link: 'https://amazon.in/dp/B0CX21C', rating: 4.8, reviews: 640, delivery: 'Tomorrow, Free', coupon: '₹5,000 HDFC Card Discount' },
        flipkart: { price: 101990, link: 'https://flipkart.com/apple-macbook-air-m3', rating: 4.7, reviews: 490, delivery: '2 Days', coupon: '₹4,000 SBI Card' },
        croma: { price: 104900, link: 'https://croma.com/macbook-air-m3', rating: 4.6, reviews: 180, delivery: 'Today In Store', coupon: 'Free Bag + Mouse' },
        reliance: { price: 105900, link: 'https://reliancedigital.in/macbook-air-m3', rating: 4.5, reviews: 110, delivery: 'Tomorrow', coupon: 'No Cost EMI' }
      }
    },
    {
      id: 'p4',
      name: 'Samsung Galaxy S24 Ultra 5G (256 GB, Titanium Gray)',
      category: 'Smartphones',
      image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&q=80',
      specs: 'Snapdragon 8 Gen 3, Galaxy AI, 200MP Quad Telephoto, Embedded S-Pen, Titanium Frame',
      mrp: 129999,
      lowestEver: 112999,
      highestEver: 129999,
      averagePrice: 121499,
      verdict: '🔥 Good Deal! ₹7,500 drop recorded this week.',
      history: [
        { day: 'Day 90', price: 129999 },
        { day: 'Day 75', price: 126999 },
        { day: 'Day 60', price: 124999 },
        { day: 'Day 45', price: 122999 },
        { day: 'Day 30', price: 119999 },
        { day: 'Day 15', price: 116999 },
        { day: 'Today', price: 113999 }
      ],
      stores: {
        amazon: { price: 113999, link: 'https://amazon.in/dp/B0CS5X8', rating: 4.6, reviews: 2900, delivery: 'Tomorrow, Free', coupon: '₹6,000 Bank Cashback' },
        flipkart: { price: 114999, link: 'https://flipkart.com/samsung-galaxy-s24-ultra', rating: 4.5, reviews: 1800, delivery: '2 Days', coupon: '₹5,000 Exchange Bonus' },
        croma: { price: 118999, link: 'https://croma.com/samsung-s24-ultra', rating: 4.4, reviews: 420, delivery: 'Same Day Pickup', coupon: 'Free Wireless Charger' },
        reliance: { price: 119999, link: 'https://reliancedigital.in/samsung-s24-ultra', rating: 4.3, reviews: 190, delivery: 'Tomorrow', coupon: '₹4,000 Bank Off' }
      }
    }
  ],

  // 5. IN-APP BROWSER PLATFORMS & 16 SUPER BROWSE APPS (EXACT SCREENSHOT MAPPING)
  inAppPlatforms: [
    {
      id: 'bewakoof',
      name: 'Bewakoof',
      category: 'Fashion & Apparel',
      url: 'https://www.bewakoof.com',
      icon: 'assets/icons/bewakoof.svg',
      themeColor: '#FDD835',
      badge: null,
      isLinked: true,
      userPhone: '+91 98765 43210',
      activeCartCount: 0,
      sessionCookie: 'bwk_sess_9021',
      cartSummary: 'Cart is empty',
      savingsFound: 'Get 10% cashback on all styles with code BEWAKOOF10'
    },
    {
      id: 'amazon',
      name: 'Amazon',
      category: 'Shopping & Electronics',
      url: 'https://www.amazon.in',
      icon: 'assets/icons/amazon.svg',
      themeColor: '#D7B98E',
      badge: '0.6%',
      isLinked: true,
      userPhone: '+91 98765 43210',
      activeCartCount: 1,
      sessionCookie: 'amz_ubid_india_81726',
      cartSummary: 'Sony WH-1000XM5 Headphones in Cart',
      savingsFound: '0.6% extra cashback tracked by Buyhatke'
    },
    {
      id: 'flipkart',
      name: 'Flipkart',
      category: 'Online Shopping',
      url: 'https://www.flipkart.com',
      icon: 'assets/icons/flipkart.svg',
      themeColor: '#FFD200',
      badge: null,
      isLinked: true,
      userPhone: '+91 98765 43210',
      activeCartCount: 0,
      sessionCookie: 'flp_sess_key_33190',
      cartSummary: 'Cart is empty',
      savingsFound: 'Flipkart SuperCoins integrated'
    },
    {
      id: 'myntra',
      name: 'Myntra',
      category: 'Fashion & Lifestyle',
      url: 'https://www.myntra.com',
      icon: 'assets/icons/myntra.svg',
      themeColor: '#FF3F6C',
      badge: '3.5%',
      isLinked: true,
      userPhone: '+91 98765 43210',
      activeCartCount: 2,
      sessionCookie: 'myn_token_8871',
      cartSummary: 'Tommy Hilfiger Shirt & Casual Dress in Cart',
      savingsFound: '3.5% instant Buyhatke cashback activated'
    },
    {
      id: 'dominos',
      name: "Domino's Pizza",
      category: 'Food & Pizza',
      url: 'https://pizzaonline.dominos.co.in',
      icon: 'assets/icons/dominos.svg',
      themeColor: '#006491',
      badge: '16.9%',
      isLinked: true,
      userPhone: '+91 98765 43210',
      activeCartCount: 0,
      sessionCookie: 'dmn_order_3389',
      cartSummary: 'Cart is empty',
      savingsFound: '16.9% Mega Cashback active on Domino\'s Pizza'
    },
    {
      id: 'pvr',
      name: 'PVR Cinemas',
      category: 'Movies & Cinema',
      url: 'https://www.pvrcinemas.com',
      icon: 'assets/icons/pvr.svg',
      themeColor: '#FFD200',
      badge: '21.1%',
      isLinked: true,
      userPhone: '+91 98765 43210',
      activeCartCount: 0,
      sessionCookie: 'pvr_inox_sess_8',
      cartSummary: 'Cart is empty',
      savingsFound: '21.1% ticket cashback with Buyhatke Pay'
    },
    {
      id: 'blinkit',
      name: 'Blinkit',
      category: 'Instant Delivery',
      url: 'https://blinkit.com',
      icon: 'assets/icons/blinkit.svg',
      themeColor: '#F8CB00',
      badge: '1.5%',
      isLinked: true,
      userPhone: '+91 98765 43210',
      activeCartCount: 2,
      sessionCookie: 'blk_sess_4b62d81',
      cartSummary: 'Fortune Sunflower Oil 1L (x1), Tomatoes 1kg - Total ₹183',
      savingsFound: '1.5% cashback • Delivering in 11 mins'
    },
    {
      id: 'zepto',
      name: 'Zepto',
      category: '10-Min Grocery',
      url: 'https://www.zeptonow.com',
      icon: 'assets/icons/zepto.svg',
      themeColor: '#751586',
      badge: '0.7%',
      isLinked: true,
      userPhone: '+91 98765 43210',
      activeCartCount: 3,
      sessionCookie: 'zpt_sess_9a87f12',
      cartSummary: 'Amul Milk (x2), Whole Wheat Bread (x1) - Total ₹102',
      savingsFound: '0.7% cashback • ₹14 cheaper than Blinkit'
    },
    {
      id: 'instamart',
      name: 'Instamart',
      category: 'Quick Commerce',
      url: 'https://www.swiggy.com/instamart',
      icon: 'assets/icons/instamart.svg',
      themeColor: '#1C64F2',
      badge: null,
      isLinked: true,
      userPhone: '+91 98765 43210',
      activeCartCount: 0,
      sessionCookie: 'swg_inst_8c31e90',
      cartSummary: 'Cart is empty',
      savingsFound: '₹50 OFF on first order'
    },
    {
      id: 'ajio',
      name: 'Ajio',
      category: 'Fashion & Trends',
      url: 'https://www.ajio.com',
      icon: 'assets/icons/ajio.svg',
      themeColor: '#FFFFFF',
      badge: null,
      isLinked: true,
      userPhone: '+91 98765 43210',
      activeCartCount: 0,
      sessionCookie: 'ajio_sess_8911',
      cartSummary: 'Cart is empty',
      savingsFound: 'Use code TRENDS500 for ₹500 off'
    },
    {
      id: 'bookmyshow',
      name: 'BookMyShow',
      category: 'Tickets & Shows',
      url: 'https://in.bookmyshow.com',
      icon: 'assets/icons/bookmyshow.svg',
      themeColor: '#E51A4C',
      badge: '5.5%',
      isLinked: true,
      userPhone: '+91 98765 43210',
      activeCartCount: 0,
      sessionCookie: 'bms_auth_6214',
      cartSummary: 'Cart is empty',
      savingsFound: '5.5% cashback on Movie & Concert tickets'
    },
    {
      id: 'bigbasket',
      name: 'Bigbasket',
      category: 'Grocery & Staples',
      url: 'https://www.bigbasket.com',
      icon: 'assets/icons/bigbasket.svg',
      themeColor: '#FFFFFF',
      badge: '3.1%',
      isLinked: true,
      userPhone: '+91 98765 43210',
      activeCartCount: 0,
      sessionCookie: 'bb_cart_9921',
      cartSummary: 'Cart is empty',
      savingsFound: '3.1% cashback with bbstar membership'
    },
    {
      id: 'meesho',
      name: 'Meesho',
      category: 'Budget Fashion & Home',
      url: 'https://www.meesho.com',
      icon: 'assets/icons/meesho.svg',
      themeColor: '#4B0F4E',
      badge: '0.7%',
      isLinked: true,
      userPhone: '+91 98765 43210',
      activeCartCount: 0,
      sessionCookie: 'msh_sess_5521',
      cartSummary: 'Cart is empty',
      savingsFound: 'Lowest price guarantee on ethnic wear'
    },
    {
      id: 'makemytrip',
      name: 'Makemytrip',
      category: 'Flights & Hotels',
      url: 'https://www.makemytrip.com',
      icon: 'assets/icons/makemytrip.svg',
      themeColor: '#E52128',
      badge: null,
      isLinked: true,
      userPhone: '+91 98765 43210',
      activeCartCount: 0,
      sessionCookie: 'mmt_sess_2188',
      cartSummary: 'Cart is empty',
      savingsFound: 'Flat ₹1,250 OFF on domestic flight bookings'
    },
    {
      id: 'jiomart',
      name: 'JioMart',
      category: 'Hypermarket & Grocery',
      url: 'https://www.jiomart.com',
      icon: 'assets/icons/jiomart.svg',
      themeColor: '#E11D2A',
      badge: '0.7%',
      isLinked: true,
      userPhone: '+91 98765 43210',
      activeCartCount: 0,
      sessionCookie: 'jio_mart_0012',
      cartSummary: 'Cart is empty',
      savingsFound: 'Free delivery on all orders with zero minimum order'
    },
    {
      id: 'morestores',
      name: 'More Stores',
      category: 'All 100+ Partner Stores',
      url: 'https://www.nykaa.com',
      icon: 'assets/icons/morestores.svg',
      themeColor: '#242834',
      badge: null,
      isLinked: true,
      userPhone: '+91 98765 43210',
      activeCartCount: 0,
      sessionCookie: 'multi_store_hub',
      cartSummary: 'Nykaa, Tata Neu, Croma, Swiggy & 100+ more',
      savingsFound: 'Explore 100+ verified partner stores'
    }
  ],

  // VERIFIED DEALS (1:1 FROM OFFICIAL BUYHATKE SCREENSHOT)
  verifiedDeals: [
    {
      id: 'deal-1',
      title: 'CareDone Women Self Design Round Neck Crop Top & Skirt Ba...',
      category: 'Women Wear',
      store: 'myntra',
      storeIcon: 'assets/icons/myntra.svg',
      image: 'assets/images/deal_1_caredone_blue_skirt.jpg',
      gaugeScore: 85,
      rating: 3.9,
      price: 361,
      originalPrice: 387.04,
      discountText: '7% Off',
      dealBadge: '💎 HOT DEAL',
      dealBadgeClass: 'badge-hot',
      url: 'https://www.myntra.com/dresses/caredone/caredone-women-self-design-round-neck-crop-top--skirt-set/26781290/buy'
    },
    {
      id: 'deal-2',
      title: 'Tommy Hilfiger Men Opaque Striped Casual Shirt (46) by Myn...',
      category: 'Casual Shirts',
      store: 'myntra',
      storeIcon: 'assets/icons/myntra.svg',
      image: 'assets/images/deal_2_tommy_hilfiger_shirt.jpg',
      gaugeScore: 86,
      rating: 3.9,
      price: 2239,
      originalPrice: 2749.92,
      discountText: '19% Off',
      dealBadge: '🚀 EPIC DEAL',
      dealBadgeClass: 'badge-epic',
      url: 'https://www.myntra.com/shirts/tommy-hilfiger/tommy-hilfiger-men-opaque-striped-casual-shirt/24910283/buy'
    },
    {
      id: 'deal-3',
      title: 'VIBE VISION Floral Tunic & Trousers',
      category: 'Women Wear',
      store: 'myntra',
      storeIcon: 'assets/icons/myntra.svg',
      image: 'assets/images/deal_3_vibe_floral_tunic.jpg',
      gaugeScore: 84,
      rating: 4.2,
      price: 597,
      originalPrice: 1199,
      discountText: '50% Off',
      dealBadge: '🔥 TOP PICK',
      dealBadgeClass: 'badge-top',
      url: 'https://www.myntra.com/kurta-sets/vibe-vision/vibe-vision-floral-tunic--trousers/25183920/buy'
    },
    {
      id: 'deal-4',
      title: 'HERE&NOW Men Relaxed Fit Vertical Striped Spread Collar C...',
      category: 'Casual Shirts',
      store: 'myntra',
      storeIcon: 'assets/icons/myntra.svg',
      image: 'assets/images/deal_4_hereandnow_striped_shirt.jpg',
      gaugeScore: 94,
      rating: 4.2,
      price: 479,
      originalPrice: 999,
      discountText: '52% Off',
      dealBadge: '💎 HOT DEAL',
      dealBadgeClass: 'badge-hot',
      url: 'https://www.myntra.com/shirts/here%26now/here%26now-men-relaxed-fit-vertical-striped-spread-collar-casual-shirt/23019482/buy'
    },
    {
      id: 'deal-5',
      title: 'Portronics 65W GaN Fast Charger with Dual Type-C & USB-A',
      category: 'Mobile Wall Chargers',
      store: 'amazon',
      storeIcon: 'assets/icons/amazon.svg',
      image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&q=80',
      gaugeScore: 92,
      rating: 4.5,
      price: 1199,
      originalPrice: 2499,
      discountText: '52% Off',
      dealBadge: '⚡ FLASH DEAL',
      dealBadgeClass: 'badge-flash',
      url: 'https://www.amazon.in/dp/B0B5D7P7QG'
    },
    {
      id: 'deal-6',
      title: 'Minimalist 2% Salicylic Acid Face Wash for Oil Control & Blackheads',
      category: 'Face Wash',
      store: 'flipkart',
      storeIcon: 'assets/icons/flipkart.svg',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&q=80',
      gaugeScore: 90,
      rating: 4.4,
      price: 284,
      originalPrice: 299,
      discountText: '5% Off',
      dealBadge: '💎 HOT DEAL',
      dealBadgeClass: 'badge-hot',
      url: 'https://www.flipkart.com/minimalist-2-salicylic-acid-face-wash/p/itm592819'
    },
    {
      id: 'deal-7',
      title: 'OnePlus Nord Buds 2r True Wireless in Ear Earbuds with Mic',
      category: 'Earbuds',
      store: 'amazon',
      storeIcon: 'assets/icons/amazon.svg',
      image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80',
      gaugeScore: 88,
      rating: 4.3,
      price: 1799,
      originalPrice: 2299,
      discountText: '22% Off',
      dealBadge: '🚀 EPIC DEAL',
      dealBadgeClass: 'badge-epic',
      url: 'https://www.amazon.in/dp/B0C3NW1T5G'
    }
  ],

  // 6. AUTO COUPONS DATABASE
  coupons: [
    {
      code: 'HATKE500',
      store: 'Amazon',
      category: 'Electronics',
      description: 'Extra ₹500 OFF on orders above ₹4,999',
      discount: '₹500 OFF',
      minOrder: 4999,
      successRate: '98% Success',
      expiry: 'Valid till 31 Oct'
    },
    {
      code: 'ZEPTOFEAST',
      store: 'Zepto',
      category: 'Grocery',
      description: 'Flat ₹75 OFF on your quick grocery delivery',
      discount: '₹75 OFF',
      minOrder: 399,
      successRate: '95% Success',
      expiry: 'Valid today'
    },
    {
      code: 'BLINKIT100',
      store: 'Blinkit',
      category: 'Grocery',
      description: 'Flat ₹100 cashback on orders above ₹699',
      discount: '₹100 Cashback',
      minOrder: 699,
      successRate: '92% Success',
      expiry: 'Valid this week'
    },
    {
      code: 'UBERGO50',
      store: 'Uber',
      category: 'Cabs',
      description: '50% OFF up to ₹75 on next 3 Uber rides',
      discount: '50% OFF',
      minOrder: 150,
      successRate: '94% Success',
      expiry: 'Limited period'
    },
    {
      code: 'EMTFLYNOW',
      store: 'EaseMyTrip',
      category: 'Flights',
      description: 'Flat ₹1,200 discount on domestic flights',
      discount: '₹1,200 OFF',
      minOrder: 4000,
      successRate: '96% Success',
      expiry: 'Valid this month'
    }
  ],

  // 7. SPEND LENS STATS
  spendLens: {
    totalSpendThisMonth: 24650,
    totalSavedWithBuyhatke: 4890,
    percentageSaved: '19.8%',
    categoryBreakdown: [
      { name: 'Grocery & Quick Comm', amount: 9200, percentage: 37, color: '#10B981', apps: 'Zepto (₹5.1k), Blinkit (₹4.1k)' },
      { name: 'Cabs & Rides', amount: 6400, percentage: 26, color: '#F59E0B', apps: 'Uber (₹3.8k), Ola (₹1.9k), Rapido (₹700)' },
      { name: 'Shopping & Tech', amount: 6800, percentage: 28, color: '#3B82F6', apps: 'Amazon (₹4.2k), Flipkart (₹2.6k)' },
      { name: 'Food & Dining', amount: 2250, percentage: 9, color: '#EC4899', apps: 'Swiggy (₹1.4k), Zomato (₹850)' }
    ],
    recentTransactions: [
      { id: 'tx1', app: 'Zepto', date: 'Today, 2:15 PM', item: 'Grocery Essentials (4 items)', amount: 384, saved: 42, icon: 'assets/icons/zepto.svg' },
      { id: 'tx2', app: 'Uber', date: 'Today, 9:30 AM', item: 'Uber Go to EcoSpace Tech Park', amount: 248, saved: 76, icon: 'assets/icons/uber.svg' },
      { id: 'tx3', app: 'Blinkit', date: 'Yesterday', item: 'Fresh Fruits & Vegetables', amount: 495, saved: 58, icon: 'assets/icons/blinkit.svg' },
      { id: 'tx4', app: 'Amazon', date: '3 Oct 2026', item: 'Sony Wireless ANC Headphones', amount: 23990, saved: 3200, icon: 'assets/icons/amazon.svg' },
      { id: 'tx5', app: 'Ola', date: '1 Oct 2026', item: 'Ola Auto to Koramangala', amount: 135, saved: 25, icon: 'assets/icons/ola.svg' }
    ]
  }
};
