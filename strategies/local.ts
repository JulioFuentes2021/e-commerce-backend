import { Strategy as localStrategy } from 'passport-local';
import passport from "passport";
import bcrypt from 'bcrypt';
import { getUser } from '../view/user';
import { IUser } from '../types';

export const localStrategyF = passport.use(new localStrategy(
	async (gmail, password, done) => {
		// const user = await getUser(username)
		console.log('Usernaem local: ',gmail)
		// console.log(user)
		// return done(null, user)
		try {
			const user:IUser | null = await getUser(gmail)
			console.log('Local strategy')
        	console.log('Valores: ', user)

			if (!user) {
				return done(null, false)
			}

			const isMatch = await bcrypt.compare(password, user.password)
			if (!isMatch) {
				// console.log('Usuario o contra incorrecta')
				return done(null, false, { message: 'Incorrect username or password.' })
			}

			return done(null, user)
		} catch (error) {
			return done(error, false)
		}
        // return done(null, username)
	}
))