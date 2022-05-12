import express, { Request, Response, NextFunction } from 'express';
import joi from "joi";

function validatorHandler(schema, property) {
    return (req:Request, res:Response, next:NextFunction) => {
        const data = req[property];
        console.log('Data oaa ', data)
        // req.body = Si es post
        // req.params = Si es un get
        // req.query 
        const { error } = schema.validate(data);
        if (error) {
            next(error)
        }

        next();
    }
}

export default validatorHandler;