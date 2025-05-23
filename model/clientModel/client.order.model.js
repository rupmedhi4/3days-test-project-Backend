import mongoose from "mongoose";
import Product from "../adminModel/product.model.js";

const orderSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'shipped', 'delivered'],
    default: 'pending',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
