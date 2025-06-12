import Product from "../../model/adminModel/product.model.js";


const getProductAll = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};


const getClientSingleProduct = async (req, res) => {
  try {
    const {id}=req.params
    const products = await Product.findById(id);
    res.status(200).json({ success: true, products });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export {getProductAll,getClientSingleProduct};
