import { request, response } from "express";
import { Usuario } from "../models/usuario.js";
import bcryptjs from "bcryptjs";
import { validationResult } from "express-validator";

const usuarioGet = async(req = request, res = response) => {
    
    const {limite=5, desde=0}= req.query;
    const query= {estado: true};

    const [total, usuarios]= await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])


    res.json({
        total,
        usuarios
    });
};

const usuarioPost = async (req, res = response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password);

    // guardar en base de dato
    await usuario.save();

    res.json({
        msg: "post API - control",
        usuario,
    });
};

const usuarioPut = async(req, res = response) => {

    const { id } = req.params;
    const{_id, password, google, correo, ...resto}= req.body;

    //TODO validar contraseña de base de datos
    if (password){
    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync(10);
    resto.password = bcryptjs.hashSync(password);

    }

    const usuario= await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
};

const usuarioDelete = async(req, res = response) => {

    const {id}= req.params;

    //borramos
    //const usuario= await Usuario.findByIdAndDelete(id);

    const usuario= await Usuario.findByIdAndUpdate(id,{estado:false});

    res.json({
        usuario
    });
};

export { usuarioGet, usuarioPost, usuarioPut, usuarioDelete };
