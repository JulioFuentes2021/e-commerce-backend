"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerApi = void 0;
const headphones_1 = __importDefault(require("./headphones"));
const user_1 = __importDefault(require("./user"));
const routerApi = (app) => {
    app.use('/headphones', headphones_1.default),
        app.use('/user', user_1.default);
};
exports.routerApi = routerApi;
