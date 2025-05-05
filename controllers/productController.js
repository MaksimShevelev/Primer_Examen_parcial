import Product from "../models/ProductModel.js";  

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();  
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Ошибка при получении продуктов" });
    }
};


const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);  
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ msg: "Продукт не найден" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Ошибка при получении продукта" });
    }
};

const addProduct = async (req, res) => {
    console.log(req.body);  

    const { name, description, price } = req.body;

    if (!name || !description || !price) {
        return res.status(400).json({ msg: "Не все параметры указаны" });
    }

    try {
        const newProduct = new Product({
            name,
            description,
            price,
        });

        await newProduct.save();  
        res.status(201).json({ msg: "Продукт добавлен", id: newProduct._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Ошибка при добавлении продукта" });
    }
};


const updateProduct = async (req, res) => {
    const { id } = req.params;
    const updatedProductData = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, updatedProductData, { new: true });
        if (updatedProduct) {
            res.status(200).json({ msg: "Продукт обновлен", product: updatedProduct });
        } else {
            res.status(404).json({ msg: "Продукт не найден" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Ошибка при обновлении продукта" });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (deletedProduct) {
            res.status(200).json({ msg: "Продукт удален" });
        } else {
            res.status(404).json({ msg: "Продукт не найден" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Ошибка при удалении продукта" });
    }
};

export { getProducts, getProductById, addProduct, updateProduct, deleteProduct };
