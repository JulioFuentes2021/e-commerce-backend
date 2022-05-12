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
exports.localStrategyF = void 0;
const passport_local_1 = require("passport-local");
const passport_1 = __importDefault(require("passport"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../view/user");
exports.localStrategyF = passport_1.default.use(new passport_local_1.Strategy((username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    // const user = await getUser(username)
    // console.log(username)
    // console.log(user)
    // return done(null, user)
    try {
        const user = yield (0, user_1.getUser)(username);
        console.log('Local strategy');
        console.log('Valores: ', user);
        if (!user) {
            return done(null, false);
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            // console.log('Usuario o contra incorrecta')
            return done(null, false, { message: 'Incorrect username or password.' });
        }
        return done(null, user);
    }
    catch (error) {
        return done(error, false);
    }
    // return done(null, username)
})));
