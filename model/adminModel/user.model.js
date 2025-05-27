import mongoose from 'mongoose'
import Order from '../clientModel/client.order.model.js'

const userSchema = mongoose.Schema({
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
    placedOrderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }]
})

const User = mongoose.model("User", userSchema)

export default User