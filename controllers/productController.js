const productService = require('../services/productService');
const { clearCache } = require('../middleware/cacheMiddleware');

const getProducts = async (req, res) => {
    try {
        const productsList = await productService.getAllProducts();
        return res.json(productsList);
    } catch (error) {
        return res.status(500).json({ error: "Error reading file" });
    }
};

const getProductById = async (req, res) => {
    try {
        const productId = Number(req.params.id);
        const item = await productService.getProductById(productId);

        if (!item) {
            return res.status(404).json({ error: "Product not found" });
        }

        return res.json(item);
    } catch (error) {
        return res.status(500).json({ error: "Error reading file" });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, price } = req.body;
        const newEntry = await productService.createProduct({ name, price });

        clearCache();
        return res.status(201).json(newEntry);
    } catch (error) {
        return res.status(500).json({ error: "Failed to create a new product" });
    }
};

const updateProduct = async (req, res) => {
    try {
        const productId = Number(req.params.id);
        const { name, price } = req.body;

        if (!name || price === undefined) {
            return res.status(400).json({ error: "Name and price required. Please provide them." });
        }

        const result = await productService.updateProduct(productId, { name, price });
        if (!result) {
            return res.status(404).json({ error: "Product not Found!" });
        }

        clearCache();
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ error: "Failed to update product" });
    }
};

const patchProduct = async (req, res) => {
    try {
        const productId = Number(req.params.id);
        const { name, price } = req.body;

        const result = await productService.patchProduct(productId, { name, price });
        if (!result) {
            return res.status(404).json({ error: "Product not found" });
        }

        clearCache();
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ error: "Failed to update product" });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const productId = Number(req.params.id);
        const removedItem = await productService.deleteProduct(productId);

        if (!removedItem) {
            return res.status(404).json({ error: "Product not found" });
        }

        clearCache();
        return res.json({ message: "Product deleted successfully", product: removedItem });
    } catch (error) {
        return res.status(500).json({ error: "Failed to delete product" });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};
