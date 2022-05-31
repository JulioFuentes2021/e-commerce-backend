"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (gmail) => {
    const expiresIn = 1000 * 60 * 15;
    const token = jsonwebtoken_1.default.sign({ gmail }, 'julio', { expiresIn });
    return { token, expiresIn };
};
exports.generateToken = generateToken;
const generateRefreshToken = (gmail, res) => {
    const expiresIn = 1000 * 60 * 60 * 24 * 30;
    const refreshToken = jsonwebtoken_1.default.sign({ gmail }, 'cesar', {
        expiresIn,
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: !(process.env.MODO === "developer"),
        expires: new Date(Date.now() + expiresIn),
    });
};
exports.generateRefreshToken = generateRefreshToken;
