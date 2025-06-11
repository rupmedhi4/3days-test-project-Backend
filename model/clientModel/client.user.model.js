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
    address: [{
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        pincode: { type: String, required: true },
        name: { type: String, required: true },
        number: { type: Number, required: true }
    }],
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