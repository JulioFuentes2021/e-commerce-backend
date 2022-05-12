import express,{Express} from 'express';
import headphones from './headphones';
import user from './user';

export const routerApi = (app:Express) => {
    app.use('/headphones', headphones),
    app.use('/user', user)
};

