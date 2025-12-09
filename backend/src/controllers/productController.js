const prisma = require('../prismaClient');

// Helper function to fetch and seed products
const seedProducts = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();

    const clothingProducts = products.filter(p =>
        p.category.includes("clothing") || p.category.includes("jewelery")
    );

    for (const product of clothingProducts) {
        await prisma.product.upsert({
            where: { id: product.id },
            update: {
                title: product.title,
                price: product.price,
                description: product.description,
                category: product.category,
                image: product.image,
                rating: product.rating?.rate || 0
            },
            create: {
                id: product.id,
                title: product.title,
                price: product.price,
                description: product.description,
                category: product.category,
                image: product.image,
                rating: product.rating?.rate || 0
            }
        });
    }
    return clothingProducts.length;
};

// Sync products from FakeStore API
exports.syncProducts = async (req, res) => {
    try {
        const count = await seedProducts();
        res.json({ message: 'Products synced successfully', count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProducts = async (req, res) => {
    try {
        // Auto-seed if database is empty
        const count = await prisma.product.count();
        if (count === 0) {
            console.log('Database empty, seeding products...');
            await seedProducts();
        }

        const { search, category, sort, page = 1, limit = 12 } = req.query;

        const where = {};

        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } }
            ];
        }

        if (category) {
            where.category = category;
        }

        const orderBy = sort === 'price-asc' ? { price: 'asc' } :
            sort === 'price-desc' ? { price: 'desc' } :
                sort === 'rating' ? { rating: 'desc' } :
                    { id: 'asc' };

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const [products, total] = await Promise.all([
            prisma.product.findMany({
                where,
                orderBy,
                skip,
                take: parseInt(limit)
            }),
            prisma.product.count({ where })
        ]);

        res.json({
            products,
            pagination: {
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProduct = async (req, res) => {
    try {
        const product = await prisma.product.findUnique({
            where: { id: parseInt(req.params.id) }
        });

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};