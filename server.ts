import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { routerApi } from './routers/index';
import mongoose from 'mongoose';
import cors from 'cors';
import { error } from './middlewares/errorHandle';

dotenv.config();

const app: Express = express();
const port = 8000;


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