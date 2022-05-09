import express, { Request, Response, NextFunction } from 'express';

export const error = (err:string, req:Request, res:Response, next:NextFunction) => {
    res.status(400).send(err)
}