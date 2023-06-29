import { rols } from "../models/roles.js";
import { Usuario } from "../models/usuario.js";

const esRolValido= async(rol='')=>{
    const existeRol= await rols.findOne({rol});
    if(!existeRol){
        throw new Error(`el rol ${rol} no esta registrado en la BD`)
    }
}

const emailExsite= async(correo='')=>{
    // Verificar si el correo existe
    const emailExsite= await Usuario.findOne({correo:correo});
    if (emailExsite){
        throw new Error(`el correo: ${correo}, ya esta registrado`);

    }

}

const existeUsuarioID= async(id)=>{
    // Verificar si el correo existe
    const existeUsuario= await Usuario.findById(id)
    if (!existeUsuario){
        throw new Error(`el ID no existe ${id}`);

    }

}



export {esRolValido, emailExsite, existeUsuarioID}