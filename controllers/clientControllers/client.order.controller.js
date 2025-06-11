import ClientUser from "../../model/clientModel/client.user.model.js";
import Order from "../../model/clientModel/client.order.model.js";
import User from "../../model/adminModel/user.model.js";
import Product from "../../model/adminModel/product.model.js";

const placedOrder = async (req, res) => {
  try {
    const productId = req.params.id;
    const { sellerId, orderedQuantity,address } = req.body;
    const clientId = req.user.id;

    if (!sellerId) {
      return res.status(400).json({ error: "sellerId is required" });
    }

    const sellerUser = await User.findById(sellerId);
    const clientUser = await ClientUser.findById(clientId);

    if (!sellerUser) {
      return res.status(404).json({ error: "Seller not found" });
    }
    if (!clientUser) {
      return res.status(404).json({ error: "Client user not found" });
    }

    if (!clientUser.address) {
      return res.status(400).json({ error: "Client address is missing" });
    }

    const order = new Order({
      productId,
      status: 'pending',
      orderedQuantity,
      sellerId,
      address
    });

    await order.save();

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

    let user;
    if (req.user.role === 'client') {
      user = await ClientUser.findById(id).populate({
        path: 'placedOrderItems',
        populate: {
          path: 'productId',
          model: 'Product',
        },
      });
    } else if (req.user.role === 'admin') {
      user = await User.findById(id).populate({
        path: 'placedOrderItems',
        populate: {
          path: 'productId',
          model: 'Product',
        },
      });
    } else {
      return res.status(403).json({ message: 'Unauthorized role' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.placedOrderItems);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ message: 'Something went wrong' });
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
    console.log(order);
    
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

const addAddress = async (req, res) => {
  try {
    const { street, city, state, country, pincode, name, number } = req.body;
    const id = req.user.id;

    const user = await ClientUser.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    user.address.push({
     
      street,
      city,
      state,
      country,
      pincode,
      name,
      number

    });

    await user.save();

    res.status(200).json({ message: "Address added successfully", user });
  } catch (error) {
    console.error("Error adding address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const user = await ClientUser.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isAlreadyInCart = user.addToCart
      .map(id => id.toString())
      .includes(productId.toString());

    if (isAlreadyInCart) {
      return res.status(400).json({ message: "Product already in cart" });
    }

    user.addToCart.push(productId);
    await user.save();

    res.status(200).json({ message: "Product added to cart", user });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const getAddToCart = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await ClientUser.findById(id).populate("addToCart");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const data = user.addToCart; 
    res.status(200).json({ message: "Cart data fetch successfully", data });
  } catch (error) {
    console.error("Error getting cart data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteAddToCartItem = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user.id; 

    const updatedCart = await ClientUser.findByIdAndUpdate(userId,{ 
        $pull: { addToCart: productId } 
      }, 
      { new: true } 
    );
    const user = await ClientUser.findById(userId).populate("addToCart");
    

    if (!updatedCart) {
      return res.status(404).json({ message: "User not found or unauthorized" });
    }

    res.status(200).json({
      message: "Product removed from cart successfully",
      cart: user.addToCart
    });

  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};



export { placedOrder, getOrder, sellerGetOrder, orderUpdate,addAddress,addToCart,getAddToCart,deleteAddToCartItem };



