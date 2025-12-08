const prisma = require('../prismaClient');

exports.addFavorite = async (req, res) => {
    try {
        const { productId } = req.body;

        const favorite = await prisma.favorite.create({
            data: {
                userId: req.userId,
                productId: parseInt(productId)
            },
            include: { product: true }
        });

        res.status(201).json(favorite);
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({ error: 'Already in favorites' });
        }
        res.status(500).json({ error: error.message });
    }
};

exports.removeFavorite = async (req, res) => {
    try {
        await prisma.favorite.deleteMany({
            where: {
                userId: req.userId,
                productId: parseInt(req.params.productId)
            }
        });

        res.json({ message: 'Removed from favorites' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getFavorites = async (req, res) => {
    try {
        const favorites = await prisma.favorite.findMany({
            where: { userId: req.userId },
            include: { product: true }
        });

        res.json(favorites);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};