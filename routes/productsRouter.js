import express from 'express';
import { getProducts, getProductById, addProduct, updateProduct, deleteProduct } from '../controllers/productController.js';

const router = express.Router();

// Применяем validacionToken ко всем запросам на добавление, обновление и удаление продуктов
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', addProduct); // Защищаем маршрут для добавления продукта
router.put('/:id', updateProduct); // Защищаем маршрут для обновления продукта
router.delete('/:id', deleteProduct); // Защищаем маршрут для удаления продукта

export default router;
