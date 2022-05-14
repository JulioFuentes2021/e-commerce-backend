import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { routerApi } from './routers/index';
import mongoose from 'mongoose';
import session from 'express-session';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { error } from './middlewares/errorHandle';

dotenv.config();

const app: Express = express();
const port = 8000;

app.use(express.json());
app.use(cookieParser());
require('./strategies/local');
require('./strategies/jwt');
// app.use(passport.initialize());
// app.use(passport.session());


// app.use(
// 	session({
// 		// key: "isAuthenticated2022f",
// 		secret: "laksjf30jf3lkajf3",
// 		resave: false,
// 		saveUninitialized: true,
// 		// store: sessionStore,
// 		cookie: {
// 			maxAge: 1000 * 60 * 24, //*1 day
// 		},
// 	})
// );

app.use(cors({
	credentials: true,
	allowedHeaders: ['Content-Type', 'Authorization'],
	origin: ['http://localhost:3000']
}));

mongoose.connect(
	process.env.DB_CONNECTION as string,
	// { useNewUrlParser: true, useUnifiedTopology: true },
	err => {
		if (err) throw err;
		console.log("Database ready :)");
	}
);

const corsOptions = {
	origin: 'http://localhost:3000'
}

app.use(cors(corsOptions))


app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server de Julio');
});



routerApi(app);

app.use(error)


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});