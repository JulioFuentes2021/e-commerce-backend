import Products from '../model/product';
import mongoose from 'mongoose';

export const AllProducts = async () => {
    const products = await Products.find();
    return products
};