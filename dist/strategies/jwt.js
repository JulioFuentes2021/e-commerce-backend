"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtStrategy = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const user_1 = __importDefault(require("../model/user"));
const options = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'julio'
};
exports.jwtStrategy = passport_1.default.use(new passport_jwt_1.Strategy(options, function (jwt_payload, done) {
    console.log('Aquii');
    user_1.default.find({ gmail: jwt_payload.sub }, function (err, user) {
        if (err) {
            console.log(err);
            return done(err, false);
        }
        if (user) {
            console.log(user);
            return done(null, user[0]);
        }
        else {
            return done(null, false);
            // or you could create a new account
        }
    });
    // done(null, user);
}));
