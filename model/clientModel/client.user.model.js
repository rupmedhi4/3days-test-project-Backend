import mongoose from 'mongoose'
import Order from './client.order.model.js';

const clientUserSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true
    },
    placedOrderItems:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
       
    }]
})

const ClientUser = mongoose.model("ClientUser",clientUserSchema)

export default ClientUser