import express from 'express';
import User from '../model/user';
import { createUser } from '../schemas/user.shcema';
import userValidator from '../middlewares/validators';
import bcrypt from 'bcrypt';
// import { localStrategyF } from '../strategies/local';
import passport from 'passport';

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
    res.send('Sign Up was an exit')
    } catch (error) {
        res.status(500).send('Something is wrong')
    }
})

router.post('/login', passport.authenticate('local', { session: false}) , async (req, res) => {
    res.json({ 
        message:"Sign Up was an exit"
    })
})


// passport.serializeUser(function (user, cb) {
// 	process.nextTick(function () {
// 		cb(null, { id: user.id, gmail: user.gmail });
// 	});
// });

// passport.deserializeUser(function (user, cb) {
// 	process.nextTick(function () {
// 		return cb(null, user);
// 	});
// });


export default router
