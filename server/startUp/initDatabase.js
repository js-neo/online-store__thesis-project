// 1. У любого пользователя будет как минимум в БД qualities & products
// 2. Они равны mock данным

const Product = require("../models/Product");
const Category = require("../models/Category");
const Size = require("../models/Size");
const Color = require("../models/Color");

const productMock = require("../mock/products.json");
const categoryMock = require("../mock/categories.json");
const sizeMock = require("../mock/sizes.json");
const colorMock = require("../mock/colors.json");

module.exports = async () => {
    const products = await Product.find();
    if (products.length < productMock.length) {
        await createInitialEntities(Product, productMock);
    }
    const categories = await Category.find();
    if (categories.length !== categoryMock.length) {
        await createInitialEntities(Category, categoryMock);
    }
    const sizes = await Size.find();
    if (sizes.length !== sizeMock.length) {
        await createInitialEntities(Size, sizeMock);
    }
    const colors = await Color.find();
    if (colors.length !== colorMock.length) {
        await createInitialEntities(Color, colorMock);
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
