import Product from '../../model/adminModel/product.model.js'
import User from '../../model/adminModel/user.model.js'

const createProduct = async (req, res) => {
  try {
    const { name, price, description, image, category, quantity } = req.body
    const id = req.user.id


    if (!name || !price || !description || !image || !category || !quantity) {
      return res.status(400).json({ message: "Please fill all the fields." })
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
    const id = req.params.id;
    const allowedFields = ["name", "price", "description", "image", "category", "quantity"];
    const updateData = {};

    for (let field of allowedFields) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
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
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
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


export { createProduct, updateProduct, deleteProduct, getProduct, getAdminCreateProducts }
