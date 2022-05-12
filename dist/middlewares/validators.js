"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validatorHandler(schema, property) {
    return (req, res, next) => {
        const data = req[property];
        console.log('Data oaa ', data);
        // req.body = Si es post
        // req.params = Si es un get
        // req.query 
        const { error } = schema.validate(data);
        if (error) {
            next(error);
        }
        next();
    };
}
exports.default = validatorHandler;
