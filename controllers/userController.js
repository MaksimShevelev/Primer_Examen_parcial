import User from "../models/UserModel.js";
import bcrypt from "bcrypt";

import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const salt = 10;
const secret_key = process.env.SECRET_KEY;

const auth = async(request,response) => {
    const{ email, password } = request.body;
    const user = await User.findOne({ email: email });

    if( !user ){
        return response.status(404).json({msg: "El usuario es invalido"});
    }

    const passOk = await bcrypt.compare(password, user.password);

    if ( !passOk ) {
        return response.status(404).json({msg: "El usuario es invalido"});
    }

    const data = {
        id: user._id,
        email: user.email,
    }

    const jwt = jsonwebtoken.sign( data, secret_key, {expiresIn: '1 h'} );

    response.json({msg: "Crecenciales correctas", token: jwt});
}

const getUsers = async (request, response) => {
    try {
        const users = await User.find(); 
        response.status(200).json(users); 
    } catch (error) {
        console.error(error);
        response.status(500).json({ msg: "Ошибка при получении пользователей" }); 
    }
}



const getUserById = async (request, response) => {
    const id = request.params.id;

    try {
    
        const user = await User.findById(id);
        if (user) {
            return response.status(200).json(user);  
        } else {
            return response.status(404).json({ msg: 'No se encontró el usuario' }); 
        }
    } catch (error) {
        return response.status(500).json({ msg: "Error al obtener el usuario" });  
    }
};





const addUser = async(request, response ) => {
    const user = request.body;
    if( !user.name || !user.email || !user.password ){
        return response.status(403).json({msg: "Faltan paramenro"});
    }
    console.log({user});

    const passwordHash = await bcrypt.hash(user.password, salt);
    user.password = passwordHash;

    const doc = new User(user);
    await doc.save();
    response.json ({ msg: "usuario guardado", data: doc });
}

const updateUser = async(request, response ) => {
    const id = request.params.id;
    const user = request.body;
    const newUser = await User.findByIdAndUpdate(id, user, {new: true});
    if (newUser) {
        response.json ( {msg: 'Usuario actualizado', data : {newUser} });
    }else {
        response.status(404).json({msg: 'No se encontro el usuario'});
    }
}

const deleteUser = async(request, response ) => {
    const id = request.params.id
    const status = User.findByIdAndDelete(id);
    if (status) {
        response.json ( {msg: 'Usuario eleminado'});
    }else {
        response.status(404).json({msg: 'No se encontro el usuario'});
    }
}


export { getUsers, getUserById, addUser, updateUser, deleteUser, auth };
