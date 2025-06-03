import mongoose from 'mongoose'
import Order from '../clientModel/client.order.model.js'
import Product from '../adminModel/product.model.js'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['client', 'admin'],
    },
    totalCreateMyProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    placedOrderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
})

const User = mongoose.model("User", userSchema)

export default User