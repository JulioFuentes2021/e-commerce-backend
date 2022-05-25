"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = __importDefault(require("../model/product"));
const user_1 = __importDefault(require("../model/user"));
const checkCategory_1 = require("../middlewares/checkCategory");
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
router.get('/shopping', passport_1.default.authenticate('jwt', { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const shoppingCart = yield user_1.default.findOne({ gmail: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.gmail });
    console.log('This is the shopping cart: ', shoppingCart === null || shoppingCart === void 0 ? void 0 : shoppingCart.shoppingCart);
    res.json({
        success: "The shopping cart was gotten successfully",
        response: shoppingCart === null || shoppingCart === void 0 ? void 0 : shoppingCart.shoppingCart
    });
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = req.query.limit;
    if (limit) {
        if (limit < 1) {
            return res.status(500).send("Limit can't be less than 1");
        }
        else {
            return res.json({
                products: yield product_1.default.find().limit(limit)
            });
        }
    }
    return res.json({
        products: yield product_1.default.find()
    });
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.id);
    const product = yield product_1.default.findById(req.params.id);
    res.json({
        products: product
    });
}));
router.get('/category/:category', checkCategory_1.checkCategory, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const limit = req.query.limit;
    if (limit) {
        if (limit < 1) {
            return res.status(500).send("Limit can't be less than 1");
        }
        else {
            return res.json({
                products: yield product_1.default.find({ category: req.params.category }).limit(limit)
            });
        }
    }
    return res.json({
        products: yield product_1.default.find({ category: req.params.category })
    });
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = new product_1.default({
            name: "DANVOUY Womens T Shirt Casual Cotton Short",
        });
        yield product.save();
        res.status(200).json({
            message: 'Product saved successfully',
            product: product
        });
    }
    catch (error) {
        res.status(404).json({
            error: error.message,
            stack: error.stack,
        });
    }
}));
exports.default = router;
