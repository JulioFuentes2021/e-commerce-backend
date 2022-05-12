import user from '../model/user';

export const getUser = async (username:string) => {
    const userFound = await user.findOne({ username:username })
    return userFound 
};