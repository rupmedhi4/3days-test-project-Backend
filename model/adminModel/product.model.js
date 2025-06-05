import mongoose from "mongoose"
import User from './user.model.js';


const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    category: {
        type: String,
        required: true,
        enum: [
            'Fruits & Vegetables',
            'Dairy, Bread & Eggs',
            'Snacks & Namkeen',
            'Beverages',
            'Staples',
            'Personal Care',
            'Home Cleaning',
            'Baby Care',
            'Pet Care',
            'Frozen Food',
            'Organic Products',
            'Other'
        ]
    },
    quantity: {
        type: String,
        required: true
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
},
    {
        timestamps: true
    }
)

const Product = mongoose.model("Product", productSchema)

export default Product