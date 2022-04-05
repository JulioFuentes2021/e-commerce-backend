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
router.get('/', (req, res) => {
    res.send('Hello from headphones');
});
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = new product_1.default({
            name: 'IE 100 PRO',
            price: 149.95,
            description: "Dynamic in-ear monitors for confident monitoring even on the loudest stages. Consistent frequency response in both low and high SPLs. High wearing comfort, even for hours, thanks to an ultra-flat design. With a stage-proof, robust construction. IE 100 PRO Wireless: 2 in 1 combo package: The powerful IE 100 PRO in-ear monitors plus Bluetooth® module for wireless use with your mobile device.",
            image: 'https://assets.sennheiser.com/img/26703/product_detail_x2_desktop_sennheiser-ie-100-pro-clear-wired.jpg'
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
