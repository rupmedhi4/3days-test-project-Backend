import Product from '../model/product.model.js'

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
            quantity
        })

        await product.save()
        res.status(201).json({
            success: true,
            message: "Product created successfully."
        })
    } catch (error) {
        res.status(500).json({
            success: false, 
            message: error.message
        })
    }
}

export { createProduct }
