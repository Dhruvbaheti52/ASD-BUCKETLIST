const db = require('../database/productDatabase');

const getAllProducts = async () => {
    const items = await db.readData();
    return items;
};

const getProductById = async (productId) => {
    const items = await db.readData();
    return items.find((item) => item.id === productId) || null;
};

const createProduct = async (payload) => {
    const items = await db.readData();
    const newProduct = {
        id: items.length + 1,
        name: payload.name,
        price: Number(payload.price)
    };
    items.push(newProduct);
    await db.writeData(items);
    return newProduct;
};

const updateProduct = async (productId, payload) => {
    const items = await db.readData();
    const targetIndex = items.findIndex((item) => item.id === productId);

    if (targetIndex === -1) return null;

    const updatedItem = {
        id: productId,
        name: payload.name,
        price: Number(payload.price)
    };

    items[targetIndex] = updatedItem;
    await db.writeData(items);
    return updatedItem;
};

const patchProduct = async (productId, payload) => {
    const items = await db.readData();
    const targetItem = items.find((item) => item.id === productId);

    if (!targetItem) return null;

    if (payload.name !== undefined) {
        targetItem.name = payload.name;
    }
    if (payload.price !== undefined) {
        targetItem.price = Number(payload.price);
    }

    await db.writeData(items);
    return targetItem;
};

const deleteProduct = async (productId) => {
    const items = await db.readData();
    const targetIndex = items.findIndex((item) => item.id === productId);

    if (targetIndex === -1) return null;

    const [removedItem] = items.splice(targetIndex, 1);
    await db.writeData(items);
    return removedItem;
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    patchProduct,
    deleteProduct
};
