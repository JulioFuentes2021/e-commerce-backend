import { Schema, model, connect, HydratedDocument } from 'mongoose';


interface User {
    username: string
    gmail:string
    password: string    
}

const productSchema = new Schema<User>({
    username: { type:String, required:true },//If I write mongoose validation like this line, typescript works better. For example, If I write this: type:Boolean, typescript will throw an error. 
    gmail:{ type:String, required:true },
    password:{ type:String, required:true },
})

const newUser = model<User>('users', productSchema)

export default newUser;

// const test:HydratedDocument<Product> = new newProduct({
//     name: 15000,
// })

// test