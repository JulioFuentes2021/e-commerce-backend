import express, { Request, Response } from 'express';
import Product from '../model/product';

const router = express.Router();

router.get('/', (req:Request, res:Response) => {
    res.send('Hello from headphones')
})


router.post('/', async (req:Request, res:Response) => {
    try {
        const product = new Product({
            name: 'IE 100 PRO',
            price: 149.95,
            description:"Dynamic in-ear monitors for confident monitoring even on the loudest stages. Consistent frequency response in both low and high SPLs. High wearing comfort, even for hours, thanks to an ultra-flat design. With a stage-proof, robust construction. IE 100 PRO Wireless: 2 in 1 combo package: The powerful IE 100 PRO in-ear monitors plus Bluetooth® module for wireless use with your mobile device.",
            image: 'https://assets.sennheiser.com/img/26703/product_detail_x2_desktop_sennheiser-ie-100-pro-clear-wired.jpg'
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