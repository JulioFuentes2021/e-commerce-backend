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
const jwt = require('jsonwebtoken');
// import { localStrategyF } from '../strategies/local';
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
router.post('/sign-up', (0, validators_1.default)(user_shcema_1.createUser, "body"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, gmail, password } = req.body;
        const hash = yield bcrypt_1.default.hash(password, 10);
        console.log(req.body);
        const newUser = new user_1.default({
            username,
            gmail,
            password: hash
        });
        yield newUser.save();
        return res.json({
            success: 'Sign Up was an exit.',
            newUser
        });
    }
    catch (error) {
        res.status(500).send('Something is wrong');
    }
}));
router.post('/login', passport_1.default.authenticate('local', { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const payload = {
        sub: (_a = req.user) === null || _a === void 0 ? void 0 : _a.gmail,
    };
    const token = jwt.sign(payload, 'julio');
    res.cookie('token', token);
    res.json({
        message: "Sign Up was an exit",
        user: req.user
    });
}));
router.get('/test', passport_1.default.authenticate('jwt', { session: false }), (req, res) => {
    res.send('Jwt funcionando');
});
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
