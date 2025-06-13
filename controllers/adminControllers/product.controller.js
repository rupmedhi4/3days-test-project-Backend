import Product from '../../model/adminModel/product.model.js'
import User from '../../model/adminModel/user.model.js'
import mongoose from 'mongoose';


const createProduct = async (req, res) => {
  try {
    const { name, price, description, image, category, quantity } = req.body
    const id = req.user.id


    if (!name || !price || !description || !image || !category || !quantity) {
      return res.status(400).json({ message: "Please fill all the fields." })
    }

    const allowedCategories = [
      'Fruits & Vegetables',
      'Dairy, Bread & Eggs',
      'Snacks & Namkeen',
      'Beverages',
      'Staples',
      'Personal Care',
      'Home Cleaning',
      'Baby Care',
      'Pet Care',
      'Frozen Food',
      'Organic Products',
      'Other'
    ];

    if (!allowedCategories.includes(category)) {
      return res.status(400).json({ message: "Invalid category selected." });
    }

    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const product = new Product({
      name,
      price,
      description,
      image,
      category,
      quantity,
      sellerId: req.user.id
    })

    await user.totalCreateMyProducts.push(product._id);
    await user.save()
    await product.save()

    res.status(201).json({
      success: true,
      message: "Product created successfully.",
      data: product
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const userId = req.user.id

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const product = await Product.findOne({ _id: productId, sellerId: userId });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found or you are not authorized to update it',
      });
    }

    const allowedFields = ["name", "price", "description", "image", "category", "quantity"];
    const updateData = {};

    for (let field of allowedFields) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }
    const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, {
      new: true,
      runValidators: true,
    });


    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating product",
      error: error.message
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id: productID } = req.params;
    const userID = req.user?.id;

    const product = await Product.findOneAndDelete({
      _id: productID,
      sellerId: userID,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found or you are not authorized to delete it",
      });
    }

    const updateUser = await User.updateOne(
      { _id: userID },
      { $pull: { totalCreateMyProducts: productID } }
    );

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {
    console.error("Error deleting product:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
const getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
const getSingleProduct = async (req, res) => {
  try {
    const {id}=req.params
    const products = await Product.findById(id);
    res.status(200).json({ success: true, products });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const getAdminCreateProducts = async (req, res) => {
  try {
    const id = req.user.id
    const user = await User.findById(id).populate("totalCreateMyProducts")
    res.status(200).json({ success: true, products: user.totalCreateMyProducts });
  } catch (error) {
    console.error("Error fetching create products:", error);
    res.status(500).json({ success: false, message: "Something went wrong", error });
  }
}

const getOrderAll = async (req, res) => {
  try {
    const id = req.user.id;
    console.log(req.user);

    const user = await User.findById(id).populate({
      path: 'placedOrderItems',
      populate: {
        path: 'productId',
        model: 'Product',
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user.placedOrderItems);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export {getOrderAll, createProduct, updateProduct, deleteProduct, getProduct, getAdminCreateProducts,getSingleProduct }
