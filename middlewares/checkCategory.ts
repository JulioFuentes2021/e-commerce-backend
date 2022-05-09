import express, { Request, Response, NextFunction } from 'express';

export const checkCategory = (req:Request, res:Response, next:NextFunction): void => {
    const category = req.params.category
    console.log(category)

    if (category === 'electronics' || category === 'jewelery' || category === "men's clothing" || category === "women's clothing") {
        next()
    } else {
        next(`Category ${category} doesn't exist.`)
    }
}