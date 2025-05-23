import mongoose from 'mongoose'
import Order from './client.order.model.js';

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
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
        pincode: { type: String }
    },
    placedOrderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'

    }]
})

const ClientUser = mongoose.model("ClientUser", clientUserSchema)

export default ClientUser