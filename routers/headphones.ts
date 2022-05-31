import express, { Request, Response } from 'express';
import Product from '../model/product';
import User from '../model/user';
import { AllProducts } from '../view/products';
import { checkCategory } from "../middlewares/checkCategory";
import passport from "passport";

const router = express.Router();

router.get('/shopping', passport.authenticate('jwt', { session:false }), async (req:Request, res:Response) => {
    // const shoppingCart = await User.findOne({ gmail: req?.user?.gmail });
    console.log('This is the shopping cart: ', req.user?.shoppingCart)

    res.json({
        success: "The shopping cart was gotten successfully",
        response:{
            shoppingCart:req.user?.shoppingCart,
            total: req.user?.total,
            shipping: req.user?.shipping,
            vat: req.user?.vat,
            grandTotal: req.user?.grandTotal
        },
        cartLength: req.user?.shoppingCart.length
    });
})

router.get('/', async (req:Request, res:Response) => {
    const limit = req.query.limit as unknown

    if(limit) {
        if(limit as number < 1) {
        return res.status(500).send("Limit can't be less than 1")
        } else {
            return res.json({
                products: await Product.find().limit(limit as number)
            })
        }
    }
    return res.json({
        products: await Product.find()
    })
})

router.get('/:id', async (req:Request, res:Response) => {
    console.log(req.params.id)

    const product = await Product.findById(req.params.id)

    res.json({
        products: product
    })
})

router.get('/category/:category', checkCategory ,async (req, res) => {
    const limit = req.query.limit as unknown

    if(limit) {
        if(limit as number < 1) {
            return res.status(500).send("Limit can't be less than 1")
            } else {
                return res.json({
                    products:await Product.find({ category:req.params.category }).limit(limit as number)
                })
            }
    }

    return res.json({
        products: await Product.find({ category:req.params.category })
    })
})

router.post('/', async (req:Request, res:Response) => {
    try {
        const product = new Product({
            name: "DANVOUY Womens T Shirt Casual Cotton Short",
            })

        await product.save()

            res.status(200).json({
                message: 'Product saved successfully',
                product:product
            })
        
    } catch (error:any) {
        res.status(404).json({
            error:error.message,
            stack:error.stack,
        })
    }
})


export default router;