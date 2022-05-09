"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCategory = void 0;
const checkCategory = (req, res, next) => {
    const category = req.params.category;
    console.log(category);
    if (category === 'electronics' || category === 'jewelery' || category === "men's clothing" || category === "women's clothing") {
        next();
    }
    else {
        next(`Category ${category} doesn't exist.`);
    }
};
exports.checkCategory = checkCategory;
