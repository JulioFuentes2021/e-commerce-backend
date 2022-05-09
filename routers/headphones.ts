import express, { Request, Response } from 'express';
import Product from '../model/product';
import { AllProducts } from '../view/products';

const router = express.Router();

router.get('/', async (req:Request, res:Response) => {
    console.log(req.query.limit)
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

router.post('/', async (req:Request, res:Response) => {
    try {
        const product = new Product({
            name: "DANVOUY Womens T Shirt Casual Cotton Short",
		price: 12.99,
		description: "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.",
		category: "women's clothing",
		image: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg"
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