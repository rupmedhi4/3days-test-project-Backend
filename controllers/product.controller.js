import Product from '../model/product.model.js'
import User from '../model/user.model.js'

const createProduct = async (req, res) => {
    try {
        const { name, price, description, image, category, quantity } = req.body


        if (!name || !price || !description || !image || !category || !quantity) {
            return res.status(400).json({ message: "Please fill all the fields." })
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
        const { name, price, description, image, category, quantity } = req.body;
        const id = req.params.id;

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { 
                name, 
                price, 
                description, 
                image, 
                category, 
                quantity 
            },
            { new: true, runValidators: true }
        );

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
        success:false,
        message: "Product not found" });
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


export { createProduct, updateProduct,deleteProduct }
