const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const authRoutes = require('./src/routes/authRoutes');

app.use('/api/auth', authRoutes);
const productRoutes = require('./src/routes/productRoutes');

app.use('/api/products', productRoutes);
const userRoutes = require('./src/routes/userRoutes');

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Zupiq API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
