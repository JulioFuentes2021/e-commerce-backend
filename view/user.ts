import user from '../model/user';
import { IUser } from '../types';


export const getUser = async (username:string) => {
    const userFound:IUser | null = await user.findOne({ gmail:username })
    return userFound 
};