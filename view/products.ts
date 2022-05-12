import Products from '../model/product';

export const AllProducts = async () => {
    const products = await Products.find();
    return products
};