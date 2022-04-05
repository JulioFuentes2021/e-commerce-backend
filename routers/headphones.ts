import express, { Request, Response } from 'express';
import User from '../model/product';

const router = express.Router();

 


router.get('/', async (req:Request, res:Response) => {
    try {
        const products = await User.find();
    res.status(200).json({
        products: products
    })
    } catch (error) {
      res.json({ error: 'Error'})  
    }
})

router.post('/', async (req:Request, res:Response) => {
    try {
        const product = new User({
            name: 'Julio',
            price: 1000,
            image:'jajaja',
            description: 'JUlio es un increible programador'
        })
    
        await product.save();
        console.log('Archivo agregado correctamente')
        res.sendStatus(200)
    } catch (error) {
        console.log(error)
        res.sendStatus(404)
    }

})

export default router;