// 1. У любого пользователя будет как минимум в БД qualities & products
// 2. Они равны mock данным

const Product = require("../models/Product");

const productMock = require("../mock/products.json");

module.exports = async () => {
    const products = await Product.find();
    console.log("products.length:", products.length);
    if (products.length !== productMock.length) {
        await createInitialEntities(Product, productMock);
    }
};

async function createInitialEntities(Model, dataMock) {
    await Model.collection.drop();
    return Promise.all(
        await dataMock.map(async (item) => {
            try {
                delete item._id;
                const newItem = new Model(item);
                await newItem.save();
                return newItem;
            } catch (error) {
                return error;
            }
        })
    );
}
