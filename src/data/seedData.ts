
// Seed data for Trendy LuxeBag
// Based on user provided JSON

// export const seedCategories = [
//     {
//         id: 'tote_bags',
//         name: 'Tote Bags',
//         description: 'Spacious and versatile bags perfect for work, travel, or everyday use.',
//         imageUrl: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=800',
//         status: 'active'
//     },
//     {
//         id: 'clutches',
//         name: 'Clutches',
//         description: 'Elegant handheld bags designed for evening wear and special occasions.',
//         imageUrl: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&q=80&w=800',
//         status: 'active'
//     },
//     {
//         id: 'shoulder_bags',
//         name: 'Shoulder Bags',
//         description: 'Classic and comfortable bags designed to be carried over the shoulder.',
//         imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
//         status: 'active'
//     },
//     {
//         id: 'crossbody',
//         name: 'Crossbody Bags',
//         description: 'Hands-free bags with long straps for comfort and security.',
//         imageUrl: 'https://images.unsplash.com/photo-1598532163257-99c9c30f6537?auto=format&fit=crop&q=80&w=800',
//         status: 'active'
//     },
//     {
//         id: 'backpacks',
//         name: 'Backpacks',
//         description: 'Stylish and practical backpacks for the modern woman on the go.',
//         imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
//         status: 'active'
//     },
//     {
//         id: 'travel_bags',
//         name: 'Travel Bags',
//         description: 'Luxurious weekender and travel bags for your next getaway.',
//         imageUrl: 'https://images.unsplash.com/photo-1553981834-a23f5b69e3ec?auto=format&fit=crop&q=80&w=800',
//         status: 'active'
//     }
// ];

export const seedProducts = [
    {
        "category": "tote_bags",
        "categoryName": "Tote Bags",
        "createdAt": "2026-01-18T10:00:00Z",
        "name": "LEGAL BRIBE Textured Tote Bag",
        "description": "Premium textured faux leather tote with roomy interior and secure zip closure for everyday and office use.",
        "price": 437,
        "discount": 83,
        "productLink": "https://www.amazon.in/LEGAL-BRIBE-Textured-Tote-bag/dp/B0CR7PKLRN",
        "images": [
            { "url": "https://m.media-amazon.com/images/I/71iHbv5vkqL._SY695_.jpg", "alt": "LEGAL BRIBE Tote Front View", "displayOrder": 1, "isPrimary": true },
            { "url": "https://m.media-amazon.com/images/I/719gTuk5eQL._SY695_.jpg", "alt": "LEGAL BRIBE Tote Side View", "displayOrder": 2, "isPrimary": false },
            { "url": "https://m.media-amazon.com/images/I/71QXWHEr5BL._SY695_.jpg", "alt": "LEGAL BRIBE Tote Interior View", "displayOrder": 3, "isPrimary": false },
            { "url": "https://m.media-amazon.com/images/I/61ApBXOobTL._SY695_.jpg", "alt": "LEGAL BRIBE Tote Lifestyle View", "displayOrder": 4, "isPrimary": false }
        ],
        "keyHighlights": [
            "Textured faux leather gives a premium look",
            "Large main compartment fits laptop and essentials",
            "Secure zip closure for safety",
            "Lightweight construction for daily carry"
        ],
        "specifications": {
            "Material": "Vegan leather",
            "Closure": "Zip",
            "LaptopCompatibility": "Up to 15.6\"",
            "Dimensions": "35 x 10 x 27 cm (approx)",
            "Weight": "Approx 500 g",
            "Compartments": "Main compartment + inner pockets"
        },
        "status": "active",
        "tags": { "isBestSale": true, "isBestseller": true, "isLimited": false, "isNew": false }
    },
    {
        "category": "tote_bags",
        "categoryName": "Tote Bags",
        "createdAt": "2026-01-18T10:00:00Z",
        "name": "Storite Embroidered Canvas Tote Bag",
        "description": "Lightweight canvas tote with embroidered print and leather handles, suitable for shopping and daily errands.",
        "price": 699,
        "discount": 45,
        "productLink": "https://www.amazon.in/Storite-Leather-Embroidery-Shoulder-27x24x9-5Cm/dp/B0FZJCP27T",
        "images": [
            { "url": "https://m.media-amazon.com/images/I/81CMb5BZyVL._SY575_.jpg", "alt": "Storite Tote Front View", "displayOrder": 1, "isPrimary": true },
            { "url": "https://m.media-amazon.com/images/I/81HPoXEkY6L._SY500_.jpg", "alt": "Storite Tote Side View", "displayOrder": 2, "isPrimary": false },
            { "url": "https://m.media-amazon.com/images/I/91pxk1mANPL._SY500_.jpg", "alt": "Storite Tote Interior View", "displayOrder": 3, "isPrimary": false },
            { "url": "https://m.media-amazon.com/images/I/91DtDHmjcUL._SY500_.jpg", "alt": "Storite Handle Detail", "displayOrder": 4, "isPrimary": false }
        ],
        "keyHighlights": [
            "Canvas body keeps the bag lightweight",
            "Embroidered print provides a handcrafted look",
            "Leather handles for comfortable grip",
            "Spacious for books and daily items"
        ],
        "specifications": {
            "Material": "Canvas with leather handles",
            "Closure": "Zip",
            "Pattern": "Embroidered",
            "Dimensions": "27 x 24 x 9.5 cm (approx)",
            "Usage": "Casual, shopping, college"
        },
        "status": "active",
        "tags": { "isBestSale": false, "isBestseller": false, "isLimited": false, "isNew": true }
    },
    {
        "category": "tote_bags",
        "categoryName": "Tote Bags",
        "createdAt": "2026-01-18T10:00:00Z",
        "name": "Miraggio Jada Solid Tote Bag",
        "description": "Structured faux-leather tote with a dedicated laptop compartment and multiple pockets for organized office carry.",
        "price": 2998,
        "discount": 25,
        "productLink": "https://www.amazon.in/Miraggio-Womens-Jada-Solid-Tote/dp/B0CJ2YSXDX",
        "images": [
            { "url": "https://m.media-amazon.com/images/I/31J2Mrwb8+L._SY500_.jpg", "alt": "Miraggio Jada Front View", "displayOrder": 1, "isPrimary": true },
            { "url": "https://m.media-amazon.com/images/I/41RhVB3LoiL._SY500_.jpg", "alt": "Miraggio Jada Side View", "displayOrder": 2, "isPrimary": false },
            { "url": "https://m.media-amazon.com/images/I/61S9tzLXzCL._SY500_.jpg", "alt": "Miraggio Jada Interior", "displayOrder": 3, "isPrimary": false },
            { "url": "https://m.media-amazon.com/images/I/41NOTn0uBfL._SY500_.jpg", "alt": "Miraggio Jada Strap Detail", "displayOrder": 4, "isPrimary": false }
        ],
        "keyHighlights": [
            "Faux leather finish for a professional appearance",
            "Dedicated laptop compartment for safe transport",
            "Multiple pockets for neat organization",
            "Comfortable shoulder drop for daily use"
        ],
        "specifications": {
            "Material": "Synthetic / Faux leather",
            "Closure": "Zip",
            "LaptopCompartment": "Yes (up to 15\")",
            "Dimensions": "36 x 30 x 13 cm (approx)",
            "ShoulderDrop": "Approx 24 cm"
        },
        "status": "active",
        "tags": { "isBestSale": true, "isBestseller": true, "isLimited": false, "isNew": false }
    },
    {
        "category": "tote_bags",
        "categoryName": "Tote Bags",
        "createdAt": "2026-01-18T10:00:00Z",
        "name": "Miraggio Dakota Solid Structured Tote",
        "description": "Structured tote with professional silhouette and roomy interior for everyday office and casual use.",
        "price": 2599,
        "discount": 20,
        "productLink": "https://www.amazon.in/Miraggio-Dakota-Solid-Structured-Women/dp/B0C7W3RKP6",
        "images": [
            { "url": "https://m.media-amazon.com/images/I/81CMb5BZyVL._SY575_.jpg", "alt": "Miraggio Dakota Front View", "displayOrder": 1, "isPrimary": true },
            { "url": "https://m.media-amazon.com/images/I/81HPoXEkY6L._SY500_.jpg", "alt": "Miraggio Dakota Side View", "displayOrder": 2, "isPrimary": false },
            { "url": "https://m.media-amazon.com/images/I/91pxk1mANPL._SY500_.jpg", "alt": "Miraggio Dakota Interior", "displayOrder": 3, "isPrimary": false },
            { "url": "https://m.media-amazon.com/images/I/91DtDHmjcUL._SY500_.jpg", "alt": "Miraggio Dakota Strap Detail", "displayOrder": 4, "isPrimary": false }
        ],
        "keyHighlights": [
            "Structured silhouette for a polished look",
            "Spacious interior for daily essentials",
            "Durable straps for comfortable carrying",
            "Suitable for office and casual wear"
        ],
        "specifications": {
            "Material": "Synthetic",
            "Closure": "Zip",
            "Compartments": "Main + inner pockets",
            "Dimensions": "Approx 34 x 28 x 12 cm"
        },
        "status": "active",
        "tags": { "isBestSale": false, "isBestseller": false, "isLimited": false, "isNew": false }
    },
    {
        "category": "clutches",
        "categoryName": "Clutches",
        "createdAt": "2026-01-18T10:00:00Z",
        "name": "DUCHESS Pearl Beaded Clutch",
        "description": "Pearl-beaded evening clutch with satin interior and a structured shape for weddings and parties.",
        "price": 1299,
        "discount": 35,
        "productLink": "https://www.amazon.in/DUCHESS-Womens-Beaded-Clutch-Wedding/dp/B0D5HFXBMZ",
        "images": [
            { "url": "https://m.media-amazon.com/images/I/81owIizce-L._SX575_.jpg", "alt": "DUCHESS Clutch Front View", "displayOrder": 1, "isPrimary": true },
            { "url": "https://m.media-amazon.com/images/I/91oZ+uc44ML._SX575_.jpg", "alt": "DUCHESS Clutch Pearl Detail", "displayOrder": 2, "isPrimary": false },
            { "url": "https://m.media-amazon.com/images/I/91cWN44l0eL._SX575_.jpg", "alt": "DUCHESS Clutch Side View", "displayOrder": 3, "isPrimary": false },
            { "url": "https://m.media-amazon.com/images/I/81Tms2wEHHL._SX575_.jpg", "alt": "DUCHESS Clutch Interior", "displayOrder": 4, "isPrimary": false }
        ],
        "keyHighlights": [
            "Elegant pearl work for a luxurious evening accessory",
            "Structured shell keeps shape under use",
            "Compact size holds essentials like phone and cards",
            "Satin lining protects delicate items"
        ],
        "specifications": {
            "Material": "Fabric with pearl embellishments",
            "Closure": "Clasp / box lock",
            "InnerLining": "Satin",
            "Occasion": "Weddings, parties"
        },
        "status": "active",
        "tags": { "isBestSale": false, "isBestseller": false, "isLimited": true, "isNew": false }
    },
    {
        "category": "clutches",
        "categoryName": "Clutches",
        "createdAt": "2026-01-18T10:00:00Z",
        "name": "TOOBA Handicraft Embroidered Shell Box Clutch",
        "description": "Handcrafted embroidered shell box clutch for bridal and festive occasions with a detailed finish.",
        "price": 1499,
        "discount": 30,
        "productLink": "https://www.amazon.in/TOOBA-Handicraft-Embroidered-Shell-Occasion/dp/B0FSSKSGXS",
        "images": [
            { "url": "https://m.media-amazon.com/images/I/81dk9xuYi0L._SY535_.jpg", "alt": "TOOBA Clutch Front View", "displayOrder": 1, "isPrimary": true },
            { "url": "https://m.media-amazon.com/images/I/81WUhj+2nvL._SY535_.jpg", "alt": "TOOBA Clutch Detail", "displayOrder": 2, "isPrimary": false },
            { "url": "https://m.media-amazon.com/images/I/7143gMLUZfL._SY535_.jpg", "alt": "TOOBA Clutch Side View", "displayOrder": 3, "isPrimary": false }
        ],
        "keyHighlights": [
            "Handcrafted embroidery for a unique look",
            "Box-clutch structure for secure storage",
            "Perfect for bridal and festive events"
        ],
        "specifications": {
            "Material": "Embroidered shell fabric",
            "Closure": "Clasp / box",
            "Dimensions": "Compact evening size",
            "Occasion": "Bridal, party"
        },
        "status": "active",
        "tags": { "isBestSale": false, "isBestseller": false, "isLimited": false, "isNew": true }
    },
    {
        "category": "shoulder_bags",
        "categoryName": "Shoulder Bags",
        "createdAt": "2026-01-18T10:00:00Z",
        "name": "ASDIP Women’s Shoulder Handbag",
        "description": "Stylish and roomy shoulder handbag built for everyday comfort with a durable body and adjustable strap.",
        "price": 1699,
        "discount": 42,
        "productLink": "https://www.amazon.in/ASDIP-Womens-Shoulder-Handbag-handbag/dp/B0CZ3684XV",
        "images": [
            { "url": "https://m.media-amazon.com/images/I/413P7YqDn1L._SY500_.jpg", "alt": "ASDIP Shoulder Bag Front View", "displayOrder": 1, "isPrimary": true },
            { "url": "https://m.media-amazon.com/images/I/41F59p+rwkL._SY695_.jpg", "alt": "ASDIP Side View", "displayOrder": 2, "isPrimary": false },
            { "url": "https://m.media-amazon.com/images/I/41nhN1zzjRL._SX500_.jpg", "alt": "ASDIP Interior", "displayOrder": 3, "isPrimary": false }
        ],
        "keyHighlights": [
            "Spacious interior for daily essentials",
            "Adjustable strap for comfort",
            "Polished hardware for a refined finish"
        ],
        "specifications": {
            "Material": "Synthetic",
            "Closure": "Zip",
            "StrapType": "Adjustable",
            "Occasion": "Everyday, office"
        },
        "status": "active",
        "tags": { "isBestSale": false, "isBestseller": true, "isLimited": false, "isNew": false }
    },
    {
        "category": "shoulder_bags",
        "categoryName": "Shoulder Bags",
        "createdAt": "2026-01-18T10:00:00Z",
        "name": "Mochi Women Shoulder Bag (66-8189)",
        "description": "Classic Mochi shoulder bag with textured finish, gold-tone hardware, and a lightweight build for everyday use.",
        "price": 945,
        "discount": 50,
        "productLink": "https://www.amazon.in/Mochi-Women-Shoulder-Bag-66-8189/dp/B0BG2PYS28",
        "images": [
            { "url": "https://m.media-amazon.com/images/I/61KYhzlSV7L._SY500_.jpg", "alt": "Mochi Shoulder Bag Front View", "displayOrder": 1, "isPrimary": true },
            { "url": "https://m.media-amazon.com/images/I/61trfkgke2L._SY500_.jpg", "alt": "Mochi Side View", "displayOrder": 2, "isPrimary": false },
            { "url": "https://m.media-amazon.com/images/I/51EHQc1FbtL._SY500_.jpg", "alt": "Mochi Detail View", "displayOrder": 3, "isPrimary": false },
            { "url": "https://m.media-amazon.com/images/I/51f9LUhNpEL._SY500_.jpg", "alt": "Mochi Interior", "displayOrder": 4, "isPrimary": false }
        ],
        "keyHighlights": [
            "Textured finish with gold-tone hardware",
            "Lightweight and comfortable shoulder drop",
            "Compact size for urban daily use"
        ],
        "specifications": {
            "Material": "PU / Synthetic",
            "Closure": "Zip",
            "Hardware": "Gold-tone",
            "Weight": "Approx 270 g"
        },
        "status": "active",
        "tags": { "isBestSale": true, "isBestseller": false, "isLimited": false, "isNew": true }
    },
    {
        "category": "shoulder_bags",
        "categoryName": "Shoulder Bags",
        "createdAt": "2026-01-18T10:00:00Z",
        "name": "Miraggio Thea Hobo Shoulder Bag",
        "description": "Pebble-grain hobo shoulder bag offering roomy storage and a stylish finish for everyday and office use.",
        "price": 3699,
        "discount": 26,
        "productLink": "https://www.amazon.in/Miraggio-Thea-Hobo-Bag-Women/dp/B0D639S1KJ",
        "images": [
            { "url": "https://m.media-amazon.com/images/I/71Lq8UuwrML._SX522_.jpg", "alt": "Miraggio Thea Front View", "displayOrder": 1, "isPrimary": true },
            { "url": "https://m.media-amazon.com/images/I/6198PJ+tIfL._SY550_.jpg", "alt": "Miraggio Thea Side View", "displayOrder": 2, "isPrimary": false },
            { "url": "https://m.media-amazon.com/images/I/71TQzb3BmcL._SX522_.jpg", "alt": "Miraggio Thea Interior", "displayOrder": 3, "isPrimary": false },
            { "url": "https://m.media-amazon.com/images/I/61Ew9AgW9CL._SX522_.jpg", "alt": "Miraggio Thea Lifestyle View", "displayOrder": 4, "isPrimary": false }
        ],
        "keyHighlights": [
            "Pebble-grain texture for a refined look",
            "Ample interior space for everyday essentials",
            "Comfortable strap for long wear"
        ],
        "specifications": {
            "Material": "Synthetic leather",
            "Closure": "Zip",
            "Dimensions": "31 x 29 x 16 cm (approx)",
            "Weight": "Approx 550 g"
        },
        "status": "active",
        "tags": { "isBestSale": true, "isBestseller": true, "isLimited": false, "isNew": false }
    },
    {
        "category": "crossbody",
        "categoryName": "Crossbody Bags",
        "createdAt": "2026-01-18T10:00:00Z",
        "name": "SENTINEL Women Crossbody Sling Bag",
        "description": "Compact crossbody sling bag with decorative embroidery and an adjustable strap for casual daily use.",
        "price": 699,
        "discount": 40,
        "productLink": "https://www.amazon.in/dp/B0GG93NRLF",
        "images": [
            { "url": "https://m.media-amazon.com/images/I/71Z5fMKlzWL._SY500_.jpg", "alt": "SENTINEL Crossbody Front View", "displayOrder": 1, "isPrimary": true },
            { "url": "https://m.media-amazon.com/images/I/61UiH9aNhIL._SY500_.jpg", "alt": "SENTINEL Crossbody Side View", "displayOrder": 2, "isPrimary": false },
            { "url": "https://m.media-amazon.com/images/I/715tgE6XlvL._SY500_.jpg", "alt": "SENTINEL Crossbody Rear View", "displayOrder": 3, "isPrimary": false },
            { "url": "https://m.media-amazon.com/images/I/61MKgSgJJ3L._SY500_.jpg", "alt": "SENTINEL Crossbody Interior", "displayOrder": 4, "isPrimary": false }
        ],
        "keyHighlights": [
            "Adjustable strap lets you wear it crossbody or shoulder",
            "Compact size holds essentials without bulk",
            "Decorative pattern for casual styling"
        ],
        "specifications": {
            "Material": "Synthetic",
            "Closure": "Zip / flap (varies by SKU)",
            "Strap": "Adjustable",
            "Dimensions": "Compact crossbody size"
        },
        "status": "active",
        "tags": { "isBestSale": false, "isBestseller": false, "isLimited": false, "isNew": true }
    },
    {
        "category": "crossbody",
        "categoryName": "Crossbody Bags",
        "createdAt": "2026-01-18T10:00:00Z",
        "name": "JI Women Nylon Crossbody Sling Bag",
        "description": "Water-resistant nylon crossbody with multiple zip pockets and adjustable strap for travel and daily errands.",
        "price": 599,
        "discount": 45,
        "productLink": "https://www.amazon.in/dp/B0FQJT85JY",
        "images": [
            { "url": "https://m.media-amazon.com/images/I/41l+2nyTPwL._SY575_.jpg", "alt": "JI Crossbody Front View", "displayOrder": 1, "isPrimary": true },
            { "url": "https://m.media-amazon.com/images/I/419uUS+2d3L.jpg", "alt": "JI Crossbody Side View", "displayOrder": 2, "isPrimary": false }
        ],
        "keyHighlights": [
            "Water-resistant nylon for durability",
            "Several zipped pockets for organized carrying",
            "Lightweight and easy to pack"
        ],
        "specifications": {
            "Material": "Nylon",
            "Closure": "Zip",
            "WaterResistant": "Yes",
            "Strap": "Adjustable",
            "Usage": "Travel, daily errands"
        },
        "status": "active",
        "tags": { "isBestSale": true, "isBestseller": false, "isLimited": false, "isNew": true }
    },
    {
        "category": "backpacks",
        "categoryName": "Backpacks",
        "createdAt": "2026-01-18T10:00:00Z",
        "name": "Sassora Genuine Leather Printed Backpack",
        "description": "Genuine leather printed backpack with multiple compartments — suitable for daily use and light travel.",
        "price": 3099,
        "discount": 48,
        "productLink": "https://www.amazon.in/Sassora-Premium-Leather-Printed-Backpack/dp/B0D8182VRX",
        "images": [
            { "url": "https://m.media-amazon.com/images/I/81tof6XGHhL._SX522_.jpg", "alt": "Sassora Backpack Front View", "displayOrder": 1, "isPrimary": true },
            { "url": "https://m.media-amazon.com/images/I/91gxO9NWJJL._SX522_.jpg", "alt": "Sassora Backpack Side View", "displayOrder": 2, "isPrimary": false },
            { "url": "https://m.media-amazon.com/images/I/81GhZpUN8dL._SX522_.jpg", "alt": "Sassora Backpack Back View", "displayOrder": 3, "isPrimary": false },
            { "url": "https://m.media-amazon.com/images/I/81w17Kxw7CL._SX522_.jpg", "alt": "Sassora Backpack Interior", "displayOrder": 4, "isPrimary": false }
        ],
        "keyHighlights": [
            "Genuine leather exterior for premium feel",
            "Multiple compartments for neat organization",
            "Durable construction for long-term use"
        ],
        "specifications": {
            "Material": "Genuine leather",
            "Closure": "Zip",
            "Compartments": "Multiple (external + internal)",
            "Capacity": "Medium",
            "Usage": "Daily, travel"
        },
        "status": "active",
        "tags": { "isBestSale": true, "isBestseller": false, "isLimited": false, "isNew": false }
    },
    {
        "category": "backpacks",
        "categoryName": "Backpacks",
        "createdAt": "2026-01-18T10:00:00Z",
        "name": "ProArch Anti-Theft Backpack",
        "description": "Anti-theft convertible backpack with secure pockets and convertible shoulder/hand modes for travel safety.",
        "price": 832,
        "discount": 35,
        "productLink": "https://www.amazon.in/ProArch-Anti-Theft-Backpack-Shoulder-Multipurpose/dp/B0FXMQ6PYR",
        "images": [
            { "url": "https://m.media-amazon.com/images/I/51W5FN-OY2L._SX466_.jpg", "alt": "ProArch Anti-Theft Backpack Front", "displayOrder": 1, "isPrimary": true },
            { "url": "https://m.media-amazon.com/images/I/41LdTDRZpML.jpg", "alt": "ProArch Backpack Side", "displayOrder": 2, "isPrimary": false },
            { "url": "https://m.media-amazon.com/images/I/51ftHfT4qKL._SX522_.jpg", "alt": "ProArch Backpack Back", "displayOrder": 3, "isPrimary": false },
            { "url": "https://m.media-amazon.com/images/I/51-Ir0JX9ZL._SX466_.jpg", "alt": "ProArch Backpack Interior", "displayOrder": 4, "isPrimary": false }
        ],
        "keyHighlights": [
            "Anti-theft pockets keep valuables secure",
            "Convertible design for multiple carry modes",
            "Multiple compartments for organized packing"
        ],
        "specifications": {
            "Material": "PU leather / canvas blend",
            "Closure": "Zippers",
            "AntiTheftFeatures": "Hidden pockets / back zipper access",
            "Straps": "Adjustable padded straps",
            "Usage": "Travel, daily commute"
        },
        "status": "active",
        "tags": { "isBestSale": true, "isBestseller": true, "isLimited": false, "isNew": false }
    },
    {
        "category": "backpacks",
        "categoryName": "Backpacks",
        "createdAt": "2026-01-18T10:00:00Z",
        "name": "ProArch Leather Backpack (Elegant)",
        "description": "Premium leather backpack with classic stitching and multiple pockets for secure daily use and commuting.",
        "price": 2499,
        "discount": 30,
        "productLink": "https://www.amazon.in/ProArch-Leather-Backpack-Elegant-Shoulder/dp/B0D2CXHV1N",
        "images": [
            { "url": "https://m.media-amazon.com/images/I/613+Z0DrJ0L._SX466_.jpg", "alt": "ProArch Leather Backpack Front", "displayOrder": 1, "isPrimary": true },
            { "url": "https://m.media-amazon.com/images/I/61d8AJXT2-L._SY450_.jpg", "alt": "ProArch Leather Backpack Side", "displayOrder": 2, "isPrimary": false },
            { "url": "https://m.media-amazon.com/images/I/51czLRQB5QL._SY450_.jpg", "alt": "ProArch Leather Backpack Rear", "displayOrder": 3, "isPrimary": false }
        ],
        "keyHighlights": [
            "Full-grain leather for durability and style",
            "Organized pockets for everyday essentials",
            "Padded straps for comfortable carrying"
        ],
        "specifications": {
            "Material": "Full-grain leather",
            "Closure": "Zipper",
            "Lining": "Polyester",
            "LaptopSleeve": "Yes (padded)",
            "Usage": "Work, commute, travel"
        },
        "status": "active",
        "tags": { "isBestSale": false, "isBestseller": false, "isLimited": false, "isNew": false }
    },
    {
        "category": "travel_bags",
        "categoryName": "Travel Bags",
        "createdAt": "2026-01-18T10:00:00Z",
        "name": "Wazdorf 41L Expandable Travel Duffel Bag",
        "description": "41L expandable and foldable waterproof duffel bag designed for weekend trips, gym use, or as carry-on luggage.",
        "price": 1299,
        "discount": 52,
        "productLink": "https://www.amazon.in/Wazdorf-Expandable-Foldable-Traveling-Waterproof/dp/B0D3V414DP",
        "images": [
            { "url": "https://m.media-amazon.com/images/I/71tZ7JmWy2L._SL1500_.jpg", "alt": "Wazdorf Travel Bag Front View", "displayOrder": 1, "isPrimary": true },
            { "url": "https://m.media-amazon.com/images/I/71l8Hyl8UZL._SL1500_.jpg", "alt": "Wazdorf Travel Bag Expanded View", "displayOrder": 2, "isPrimary": false }
        ],
        "keyHighlights": [
            "41-liter expandable capacity for flexible packing",
            "Waterproof fabric protects belongings from moisture",
            "Foldable design for compact storage",
            "Multiple carry options including luggage strap"
        ],
        "specifications": {
            "Material": "Waterproof nylon",
            "Capacity": "41 L",
            "Closure": "Zip",
            "Expandable": "Yes",
            "Compartments": "Main + inner pockets",
            "Usage": "Travel, gym, overnight"
        },
        "status": "active",
        "tags": { "isBestSale": true, "isBestseller": true, "isLimited": false, "isNew": false }
    }
];
