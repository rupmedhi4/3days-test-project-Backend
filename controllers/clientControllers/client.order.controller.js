import ClientUser from "../../model/clientModel/client.user.model.js";
import Order from "../../model/clientModel/client.order.model.js";
import User from "../../model/adminModel/user.model.js";
import Product from "../../model/adminModel/product.model.js";

const placedOrder = async (req, res) => {
  try {
    const productId = req.params.id;
    const { sellerId,orderedQuantity } = req.body;
    const clientId = req.user.id;
    console.log(req.user.id);



    if (!sellerId) {
      return res.status(400).json({ error: "sellerId is required" });
    }

    const order = new Order({
      productId,
      status: 'pending',
      orderedQuantity,
      sellerId
    });

    await order.save();

    const sellerUser = await User.findById(sellerId);
    if (!sellerUser) {
      return res.status(404).json({ error: "Seller not found" });
    }

    const clientUser = await ClientUser.findById(clientId);
    if (!clientUser) {
      return res.status(404).json({ error: "Client user not found" });
    }

    sellerUser.placedOrderItems.push(order._id);
    clientUser.placedOrderItems.push(order._id);

    await sellerUser.save();
    await clientUser.save();

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getOrder = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await ClientUser.findById(id).populate({
      path: 'placedOrderItems',
      populate: {
        path: 'productId',
        model: 'Product'
      }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.placedOrderItems); 
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const sellerGetOrder = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id).populate({
      path: 'placedOrderItems',
      populate: {
        path: 'productId',
        model: 'Product'
      }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.placedOrderItems); 
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const orderUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;

    const allowedStatus = ["pending", "shipped", "delivered", "cancelled"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.sellerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to update this order" });
    }

    order.status = status;
    await order.save();

    res.status(200).json({
      message: "Order updated successfully",
      order,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




export { placedOrder, getOrder,sellerGetOrder,orderUpdate };



