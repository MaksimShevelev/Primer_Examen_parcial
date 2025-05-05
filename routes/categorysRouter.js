import express from 'express';
import { getCategorys, addCategory, getCategoryById, updateCategory, deleteCategory } from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', getCategorys);  // Получить все категории
router.get('/:id', getCategoryById);  // Получить категорию по ID
router.post('/', addCategory);  // Добавить категорию
router.put('/:id', updateCategory);  // Обновить категорию
router.delete('/:id', deleteCategory);  // Удалить категорию

export default router;
