"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = void 0;
const error = (err, req, res, next) => {
    res.status(400).send(err);
};
exports.error = error;
