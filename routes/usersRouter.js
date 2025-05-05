import express from "express";
import { getUsers, getUserById, addUser, updateUser, deleteUser, auth } from "../controllers/userController.js";
import { validacionToken } from "../middlewares/auth.js";

const router = express.Router();


router.get('/',  getUsers);

router.get('/:id', validacionToken, getUserById);

router.post('/', addUser);

router.delete('/:id', validacionToken, deleteUser);

router.put('/:id', validacionToken, updateUser);

router.post('/:id', auth);

export default router;
