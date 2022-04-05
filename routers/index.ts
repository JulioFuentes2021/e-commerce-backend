import express,{Express} from 'express';
import headphones from './headphones'

export const routerApi = (app:Express) => {
    app.use('/headphones', headphones)
};

