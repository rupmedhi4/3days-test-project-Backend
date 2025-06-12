import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors'

import { db } from './db.js';
//admin route
import userRoute from './routes/adminRoute/user.route.js'
import productRoute from './routes/adminRoute/product.route.js'


//client route
import clientUserRoute from './routes/clientRoutes/client.user.route.js'
import orderRoute from './routes/clientRoutes/client.order.route.js'
import cartRoute from './routes/clientRoutes/client.cart.route.js'
import clientProductRoute from './routes/clientRoutes/client.product.route.js'
import Product from './model/adminModel/product.model.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//Admin Route
app.use('/auth/user', userRoute)
app.use('/product', productRoute)


// Client Route
app.use('/auth/client', clientUserRoute)
app.use('/client/order', orderRoute)
app.use('/client/cart', cartRoute)
app.use('/client/product', clientProductRoute)





db().then(
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    }));

