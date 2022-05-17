import { Schema, model, connect, HydratedDocument } from 'mongoose';
import { IUser } from '../types'


// type Cart = {
//     name: string
//     image: string
//     price: number
//     amount:number
// }

// interface User {
//     username: string
//     gmail:string
//     password: string
//     shoppingCart: [Cart]    
// }

const productSchema = new Schema<IUser>({
    username: { type:String, required:true },//If I write mongoose validation like this line, typescript works better. For example, If I write this: type:Boolean, typescript will throw an error. 
    gmail:{ type:String, required:true },
    password:{ type:String, required:true },
    shoppingCart:{ type:[], required:false },
})

const newUser = model<IUser>('users', productSchema)

export default newUser;

// const test:HydratedDocument<Product> = new newProduct({
//     name: 15000,
// })

// test