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
const user_1 = __importDefault(require("../model/user"));
const user_shcema_1 = require("../schemas/user.shcema");
const validators_1 = __importDefault(require("../middlewares/validators"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt = require("jsonwebtoken");
// import { localStrategyF } from '../strategies/local';
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
router.post("/sign-up", (0, validators_1.default)(user_shcema_1.createUser, "body"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, gmail, password } = req.body;
        const hash = yield bcrypt_1.default.hash(password, 10);
        console.log(req.body);
        const newUser = new user_1.default({
            username,
            gmail,
            password: hash,
        });
        yield newUser.save();
        return res.json({
            success: "Sign Up was an exit.",
            newUser,
        });
    }
    catch (error) {
        res.status(500).send("Something is wrong");
    }
}));
router.post("/login", passport_1.default.authenticate("local", { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const payload = {
        sub: (_a = req.user) === null || _a === void 0 ? void 0 : _a.gmail,
    };
    const token = jwt.sign(payload, "julio");
    res.cookie("token", token);
    res.json({
        message: "Sign Up was an exit",
        user: req.user,
    });
}));
router.get("/test", passport_1.default.authenticate("jwt", { session: false }), (req, res) => {
    res.json({
        success: "JWT funcionando",
    });
});
router.post("/add", passport_1.default.authenticate("jwt", { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
    const { name, image, amount, price } = req.body;
    try {
        console.log('jwt req: ', (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.gmail);
        const productIndex = (_c = req.user) === null || _c === void 0 ? void 0 : _c.shoppingCart.findIndex(product => product.name ===
            name);
        if (productIndex === -1) {
            (_d = req.user) === null || _d === void 0 ? void 0 : _d.shoppingCart.push({
                name,
                image,
                amount,
                price,
            });
            if (req.user) {
                yield user_1.default.updateOne({ "gmail": (_e = req.user) === null || _e === void 0 ? void 0 : _e.gmail }, { "total": ((_f = req.user) === null || _f === void 0 ? void 0 : _f.total) + (amount * price), "shipping": (((_g = req.user) === null || _g === void 0 ? void 0 : _g.total) + (amount * price)) * 0.06, "vat": (((_h = req.user) === null || _h === void 0 ? void 0 : _h.total) + (amount * price)) * 0.04, "grandTotal": ((_j = req === null || req === void 0 ? void 0 : req.user) === null || _j === void 0 ? void 0 : _j.total) + (amount * price) + (((_k = req === null || req === void 0 ? void 0 : req.user) === null || _k === void 0 ? void 0 : _k.total) + (amount * price)) * 0.06 + (((_l = req === null || req === void 0 ? void 0 : req.user) === null || _l === void 0 ? void 0 : _l.total) + (amount * price)) * 0.04 });
            }
            yield ((_m = req.user) === null || _m === void 0 ? void 0 : _m.save());
        }
        else {
            const options = { upsert: true, setDefaultsOnInsert: true, new: true };
            if (req.user) {
                console.log('Accediendo al amount: ', req.user.shoppingCart[productIndex].amount);
                yield user_1.default.updateOne({ "gmail": req.user.gmail, "shoppingCart.name": name }, { $set: { "shoppingCart.$.amount": amount + req.user.shoppingCart[productIndex].amount, "total": ((_o = req === null || req === void 0 ? void 0 : req.user) === null || _o === void 0 ? void 0 : _o.total) + (amount * price), "shipping": (((_p = req === null || req === void 0 ? void 0 : req.user) === null || _p === void 0 ? void 0 : _p.total) + (amount * price)) * 0.06, "vat": (((_q = req === null || req === void 0 ? void 0 : req.user) === null || _q === void 0 ? void 0 : _q.total) + (amount * price)) * 0.04, "grandTotal": ((_r = req === null || req === void 0 ? void 0 : req.user) === null || _r === void 0 ? void 0 : _r.total) + (amount * price) + (((_s = req === null || req === void 0 ? void 0 : req.user) === null || _s === void 0 ? void 0 : _s.total) + (amount * price)) * 0.06 + (((_t = req === null || req === void 0 ? void 0 : req.user) === null || _t === void 0 ? void 0 : _t.total) + (amount * price)) * 0.04 } });
            }
        }
        res.json({
            success: "The product was added successfully",
        });
    }
    catch (error) {
        res.status(404).json({
            message: "Slio mal",
            error
        });
    }
}));
// passport.serializeUser(function (user:IUser, cb) {
// 	process.nextTick(function () {
// 		cb(null, { id: user.gmail, password:user.password });
// 	});
// });
// passport.deserializeUser(function (user:IUser, cb) {
// 	process.nextTick(function () {
// 		return cb(null, user);
// 	});
// });
exports.default = router;
