import express from "express";
import User from "../model/user";
import { createUser } from "../schemas/user.shcema";
import userValidator from "../middlewares/validators";
import bcrypt from "bcrypt";
const jwt = require("jsonwebtoken");
// import { localStrategyF } from '../strategies/local';
import passport from "passport";
import { IUser } from "../types";
import { getUser } from "../view/user";

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
		const token = jwt.sign(payload, "julio");
		res.cookie("token", token);

		res.json({
			message: "Sign Up was an exit",
			user: req.user,
		});
	}
);

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
	const { name, image, amount, price, gmail } = req.body;

	try {
		console.log(gmail);
		const addToCart = await getUser(gmail);
		console.log(addToCart);

		const productIndex = addToCart?.shoppingCart.findIndex(
			product =>
				product.name ===
				name
		);

		if (productIndex === -1) {
			addToCart?.shoppingCart.push({
				name,
				image,
				amount,
				price,
			});

			await addToCart?.save();
		} else {
			const options = { upsert:true, setDefaultsOnInsert: true, new:true }

			if(addToCart){
				console.log('Accediendo al amount: ', addToCart.shoppingCart[productIndex as number].amount)
			await User.updateOne({ "gmail":gmail, "shoppingCart.name":name }, { $set: { "shoppingCart.$.amount":amount + addToCart.shoppingCart[productIndex as number].amount } })
				
			}
        }

		console.log(productIndex);

		res.json({
			success: "The product was added successfully",
		});
	} catch (error) {
		console.log("Error desde /add: ", error);
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
