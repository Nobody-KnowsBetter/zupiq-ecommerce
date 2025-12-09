const prisma = require('../prismaClient');

exports.addFavorite = async (req, res) => {
    try {
        const { productId, productTitle, productPrice, productImage, productCategory } = req.body;

        const favorite = await prisma.favorite.create({
            data: {
                userId: req.userId,
                productId: parseInt(productId),
                productTitle,
                productPrice: parseFloat(productPrice),
                productImage,
                productCategory
            }
        });

        res.status(201).json(favorite);
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({ error: 'Already in favorites' });
        }
        console.error('Add to favorites error:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.removeFavorite = async (req, res) => {
    try {
        console.log('Removing favorite:', req.userId, req.params.productId);
        console.log('Attempting to remove wishlist item:', req.userId, req.params.productId);
        const result = await prisma.favorite.deleteMany({
            where: {
                userId: req.userId,
                productId: parseInt(req.params.productId)
            }
        });
        console.log('Remove wishlist result:', result);

        res.json({ message: 'Removed from wishlist' });
    } catch (error) {
        console.error('Remove wishlist error:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.getFavorites = async (req, res) => {
    try {
        const favorites = await prisma.favorite.findMany({
            where: { userId: req.userId }
        });

        res.json(favorites);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};