const prisma = require('../prismaClient');

exports.addToCart = async (req, res) => {
    try {
        const { productId, productTitle, productPrice, productImage, productCategory, quantity } = req.body;

        // Check if item already exists in cart
        const existingItem = await prisma.cartItem.findUnique({
            where: {
                userId_productId: {
                    userId: req.userId,
                    productId: parseInt(productId)
                }
            }
        });

        if (existingItem) {
            // Update quantity
            const updatedItem = await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + (quantity || 1) }
            });
            return res.json(updatedItem);
        }

        const cartItem = await prisma.cartItem.create({
            data: {
                userId: req.userId,
                productId: parseInt(productId),
                quantity: quantity || 1,
                productTitle,
                productPrice: parseFloat(productPrice),
                productImage,
                productCategory
            }
        });

        res.status(201).json(cartItem);
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({ error: 'Already in favorites' });
        }
        console.error('Add to favorites error:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        await prisma.cartItem.deleteMany({
            where: {
                userId: req.userId,
                productId: parseInt(req.params.productId)
            }
        });

        res.json({ message: 'Removed from cart' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateCartItem = async (req, res) => {
    try {
        const { quantity } = req.body;

        await prisma.cartItem.updateMany({
            where: {
                userId: req.userId,
                productId: parseInt(req.params.productId)
            },
            data: { quantity: parseInt(quantity) }
        });

        res.json({ message: 'Cart updated' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCart = async (req, res) => {
    try {
        const cart = await prisma.cartItem.findMany({
            where: { userId: req.userId },
            orderBy: { createdAt: 'desc' }
        });

        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
