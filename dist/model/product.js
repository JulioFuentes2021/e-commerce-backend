"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    // email:{ type:String, required:true },
    image: { type: String, required: true },
    category: { type: String, required: true }
});
const newProduct = (0, mongoose_1.model)('products', productSchema);
exports.default = newProduct;
// const test:HydratedDocument<Product> = new newProduct({
//     name: 15000,
// })
// test
