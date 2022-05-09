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
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.query.limit);
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
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = new product_1.default({
            name: "DANVOUY Womens T Shirt Casual Cotton Short",
            price: 12.99,
            description: "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.",
            category: "women's clothing",
            image: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg"
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
