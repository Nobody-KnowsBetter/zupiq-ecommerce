const prisma = require('../prismaClient');

exports.addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;

        const wishlistItem = await prisma.wishlist.create({
            data: {
                userId: req.userId,
                productId: parseInt(productId)
            },
            include: { product: true }
        });

        res.status(201).json(wishlistItem);
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({ error: 'Already in wishlist' });
        }
        res.status(500).json({ error: error.message });
    }
};

exports.removeFromWishlist = async (req, res) => {
    try {
        await prisma.wishlist.deleteMany({
            where: {
                userId: req.userId,
                productId: parseInt(req.params.productId)
            }
        });

        res.json({ message: 'Removed from wishlist' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getWishlist = async (req, res) => {
    try {
        const wishlist = await prisma.wishlist.findMany({
            where: { userId: req.userId },
            include: { product: true }
        });

        res.json(wishlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};