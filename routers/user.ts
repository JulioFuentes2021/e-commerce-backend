import express from "express";
import User from "../model/user";
import { createUser } from "../schemas/user.shcema";
import userValidator from "../middlewares/validators";
import bcrypt from "bcrypt";
const jwt = require("jsonwebtoken");
// import { localStrategyF } from '../strategies/local';
import passport from "passport";
import { generateToken, generateRefreshToken } from "../utils/jwtUtils";

const router = express.Router();

router.post("/sign-up", userValidator(createUser, "body"), async (req, res) => {
	try {
		const { username, gmail, password } = req.body;
		const hash = await bcrypt.hash(password, 10);
		console.log(req.body);
		const newUser = new User({
			username,
			gmail,
			password: hash,
		});

		await newUser.save();

		return res.json({
			success: "Sign Up was an exit.",
			newUser,
		});
	} catch (error) {
		res.status(500).send("Something is wrong");
	}
});

router.post(
	"/login",
	passport.authenticate("local", { session: false }),
	async (req, res) => {
		const payload = {
			sub: req.user?.gmail,
		};

		const gmail = req.user?.gmail as string
        const { token, expiresIn } = generateToken(gmail);
        generateRefreshToken(gmail, res);

		return res.json({ token, expiresIn });

		// const token = jwt.sign(payload, "julio");
		// res.cookie("token", token);

		// res.json({
		// 	message: "Sign Up was an exit",
		// 	user: req.user,
		// });
	}
);

router.get('/refresh', (req, res) => {
	try {
        let refreshTokenCookie = req.cookies?.refreshToken;
        if (!refreshTokenCookie) throw new Error("No existe el refreshToken");

        const { gmail } = jwt.verify(refreshTokenCookie, 'cesar');

        const { token, expiresIn } = generateToken(gmail);

        return res.json({ token, expiresIn });
    } catch (error) {
        console.log(error);
        const data = 'Token incorrect'
        return res.status(401).json({ error: data });
    }
})

router.get(
	"/test",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		res.json({
			success: "JWT funcionando",
		});
	}
);

router.post("/add", passport.authenticate("jwt", { session: false}), async (req, res) => {
	const { name, image, amount, price } = req.body;

	try {
		console.log('jwt req: ',req?.user?.gmail);

		const productIndex = req.user?.shoppingCart.findIndex(
			product =>
				product.name ===
				name
		);

		if (productIndex === -1) {
			req.user?.shoppingCart.push({
				name,
				image,
				amount,
				price,
			}); 

			if(req.user) {
				await User.updateOne({ "gmail":req.user?.gmail }, { "total":req.user?.total + (amount*price), "shipping":(req.user?.total + (amount*price)) * 0.06, "vat":(req.user?.total + (amount*price)) * 0.04, "grandTotal": req?.user?.total + (amount*price) + (req?.user?.total + (amount*price)) * 0.06 + (req?.user?.total + (amount*price)) * 0.04 })
			}

			await req.user?.save();
		} else {
			const options = { upsert:true, setDefaultsOnInsert: true, new:true }

			if(req.user){
				console.log('Accediendo al amount: ', req.user.shoppingCart[productIndex as number].amount)
			await User.updateOne({ "gmail":req.user.gmail, "shoppingCart.name":name }, { $set: { "shoppingCart.$.amount":amount + req.user.shoppingCart[productIndex as number].amount, "total":req?.user?.total + (amount*price), "shipping":(req?.user?.total + (amount*price)) * 0.06, "vat":(req?.user?.total + (amount*price)) * 0.04, "grandTotal": req?.user?.total + (amount*price) + (req?.user?.total + (amount*price)) * 0.06 + (req?.user?.total + (amount*price)) * 0.04 } })
			}
        }

		res.json({
			success: "The product was added successfully",
		});
	} catch (error) {
		res.status(404).json({
			message: "Slio mal",
			error
		});
	}
});

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

export default router;
