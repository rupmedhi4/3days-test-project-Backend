import ClientUser from "../../model/clientModel/client.user.model.js";
import Order from "../../model/clientModel/client.order.model.js";
import User from "../../model/adminModel/user.model.js";
import Product from "../../model/adminModel/product.model.js";


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



export { addAddress,addToCart,getAddToCart,deleteAddToCartItem };



