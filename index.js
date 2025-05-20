import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors'

import { db } from './db.js';
import userRoute from './routes/user.route.js'

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


app.use('/user',userRoute)












db().then(
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    }));

