import express from 'express';
import User from '../model/user';
import { createUser } from '../schemas/user.shcema';
import userValidator from '../middlewares/validators';
import bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');
// import { localStrategyF } from '../strategies/local';
import passport from 'passport';
import { IUser } from '../types';

const router = express.Router();

router.post('/sign-up', userValidator(createUser, "body") ,async (req, res) => {
    try {
        const { username, gmail, password } = req.body;
        const hash = await bcrypt.hash(password, 10);
        console.log(req.body)
        const newUser = new User({
            username,
            gmail,
            password: hash
        })

        await newUser.save();

        return res.json({
            success:'Sign Up was an exit.',
            newUser
        })
    } catch (error) {
        res.status(500).send('Something is wrong')
    }
})

router.post('/login', passport.authenticate('local', { session: false}) , async (req, res,) => {

    const payload = {
        sub:req.user?.gmail,
    }
    const token = jwt.sign(payload, 'julio')
    res.cookie('token',token);

    res.json({ 
        message:"Sign Up was an exit",
        user: req.user
    })
})

router.get('/test', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send('Jwt funcionando')
})


// passport.serializeUser(function (user:IUser, cb) {
// 	process.nextTick(function () {
// 		cb(null, { id: user.gmail, password:user.password });
// 	});
// });

// passport.deserializeUser(function (user:IUser, cb) {
// 	process.nextTick(function () {
// 		return cb(null, user);
// 	});
// });


export default router
