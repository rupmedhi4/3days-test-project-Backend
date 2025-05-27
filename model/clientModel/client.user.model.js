import mongoose from 'mongoose'
import Product from '../adminModel/product.model.js';
import Order from '../clientModel/client.order.model.js'

const clientUserSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ['client', 'admin'],
        
    },
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
        pincode: { type: String }
    },
    addToCart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    placedOrderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'

    }]
})

const ClientUser = mongoose.model("ClientUser", clientUserSchema)

export default ClientUser