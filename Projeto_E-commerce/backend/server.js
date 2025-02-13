require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB conectado'))
  .catch(err => console.log('Erro ao conectar ao MongoDB:', err));

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    stock: { type: Number, required: true }
});

const Product = mongoose.model('Product', ProductSchema);

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
});

app.post('/products', async (req, res) => {
    const { name, price, imageUrl, stock } = req.body;

    if (!name || !price || !imageUrl || stock === undefined) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    try {
        const newProduct = new Product({ name, price, imageUrl, stock });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Erro ao adicionar o produto:', error);
        res.status(500).json({ error: 'Erro ao adicionar o produto' });
    }
});

app.delete('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        res.json({ message: 'Produto removido com sucesso' });
    } catch (error) {
        console.error('Erro ao remover produto:', error);
        res.status(500).json({ error: 'Erro ao remover o produto' });
    }
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
