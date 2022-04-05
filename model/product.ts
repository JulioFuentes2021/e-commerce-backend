import { Schema, model, connect, HydratedDocument } from 'mongoose';


interface Product {
    name: string
    price:number
    description:string
    // email:string
    image:string
}

const productSchema = new Schema<Product>({
    name: { type:String, required:true },//If I write mongoose validation like this line, typescript works better. For example, If I write this: type:Boolean, typescript will throw an error. 
    price:{ type:Number, required:true },
    description:{ type:String, required:true },
    // email:{ type:String, required:true },
    image:{ type:String, required:true },
})

const newProduct = model<Product>('products', productSchema)

export default newProduct;

// const test:HydratedDocument<Product> = new newProduct({
//     name: 15000,
// })

// test