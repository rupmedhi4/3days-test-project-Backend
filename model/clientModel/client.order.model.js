import mongoose from "mongoose";
import Product from "../adminModel/product.model.js";
import User from '../adminModel/user.model.js'
import ClientUser from './client.user.model.js';

const orderSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'cancelled', 'shipped', 'delivered'],
    default: 'pending',
  },
  orderedQuantity: {
    type: Number,
    default: 1,
    required: true
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pincode: { type: String, required: true },
    name: { type: String, required: true },
    number: { type: Number, required: true },
    _id: false
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClientUser',
    required: true
  },
  paymentMode:{
    type:String,
    enum:['COD','Online'],
    required:true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
