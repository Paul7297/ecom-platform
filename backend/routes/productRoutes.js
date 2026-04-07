const express = require('express');
const router = express.Router();
const ensureAuth = require('../middleware/auth');

console.log('🔥 productRoutes.js is LOADED!');

// Get all products (protected route)
router.get('/', ensureAuth, (req, res) => {
    console.log("------------------------logged in user details------------------------", req.user);
    res.status(200).json({
        success: true,
        products: [{
            name: "Product 1",
            price: 100,
            description: "This is a product 1",
            image: "https://via.placeholder.com/150",
            category: "Category 1",
            brand: "Brand 1",
            stock: 100,
            rating: 4.5,
            reviews: 100,
            isFeatured: true,
        }]
    });
});

// Get single product by ID
router.get('/:id', ensureAuth, (req, res) => {
    res.status(200).json({
        success: true,
        message: `Get product with ID: ${req.params.id}`
    });
});

// Create new product (protected)
router.post('/', ensureAuth, (req, res) => {
    res.status(201).json({
        success: true,
        message: "Product created successfully",
        product: req.body
    });
});

module.exports = router;