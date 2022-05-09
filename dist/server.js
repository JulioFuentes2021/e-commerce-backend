"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = require("./routers/index");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const errorHandle_1 = require("./middlewares/errorHandle");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 8000;
mongoose_1.default.connect(process.env.DB_CONNECTION, 
// { useNewUrlParser: true, useUnifiedTopology: true },
err => {
    if (err)
        throw err;
    console.log("Database ready :)");
});
const corsOptions = {
    origin: 'http://localhost:3000'
};
app.use((0, cors_1.default)(corsOptions));
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server de Julio');
});
(0, index_1.routerApi)(app);
app.use(errorHandle_1.error);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
