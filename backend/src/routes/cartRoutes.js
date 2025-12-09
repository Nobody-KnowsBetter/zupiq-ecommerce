const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.post('/', cartController.addToCart);
router.get('/', cartController.getCart);
router.delete('/:productId', cartController.removeFromCart);
router.put('/:productId', cartController.updateCartItem);

module.exports = router;
