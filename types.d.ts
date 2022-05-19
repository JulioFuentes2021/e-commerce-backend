export type Category = 'electronics' | 'jewelery' | "men's clothing" | "women's clothing"


export type Cart = {
    name: string
    image: string
    price: number
    amount:number
}

export interface IUser {
    username: string
    gmail:string
    password:string
    shoppingCart: [Cart]
    save:() => void
}

declare global {
    namespace Express {
      interface User extends IUser{}
    }
  }