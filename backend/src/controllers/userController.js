const prisma = require('../prismaClient');

exports.getProfile = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.userId },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;

        const user = await prisma.user.update({
            where: { id: req.userId },
            data: { name, email },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true
            }
        });

        res.json(user);
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({ error: 'Email already in use' });
        }
        res.status(500).json({ error: error.message });
    }
};
