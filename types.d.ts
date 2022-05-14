export type Category = 'electronics' | 'jewelery' | "men's clothing" | "women's clothing"

export interface IUser extends User {
    username: string
    gmail:string
    password:string
}

// declare global {
//     namespace Express {
//       interface User extends IUser{}
//     }
//   }