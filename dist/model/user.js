"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// type Cart = {
//     name: string
//     image: string
//     price: number
//     amount:number
// }
// interface User {
//     username: string
//     gmail:string
//     password: string
//     shoppingCart: [Cart]    
// }
const productSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    gmail: { type: String, required: true },
    password: { type: String, required: true },
    shoppingCart: { type: [], required: false },
});
const newUser = (0, mongoose_1.model)('users', productSchema);
exports.default = newUser;
// const test:HydratedDocument<Product> = new newProduct({
//     name: 15000,
// })
// test
