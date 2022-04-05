import { prop, getModelForClass } from '@typegoose/typegoose';

class User {

    @prop({  required:true })//Mongoose
    name: string//Typescript

    @prop()
    price: number

    @prop()
    image:string

    @prop()
    description:string

}

const userModel = getModelForClass(User);
export default userModel;