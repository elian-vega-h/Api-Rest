import {Schema, model} from "mongoose";


const UsuarioSchema= Schema({
    nombre:{
        type: String,
        required: [true, 'el nombre es obligatorio']
    },
    correo:{
        type: String,
        required: [true, 'el correo es obligatorio']
    },
    password:{
        type: String,
        required: [true, 'el contrañesa es obligatorio']
    },
    img:{
        type: String,
    },
    rol:{
        type: String,
        required: true,
        enmun: ['ADMIN_ROLE','USER_ROLE']
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: String,
        default: false
    },
});

UsuarioSchema.methods.toJSON= function(){
    const {_v, password, ...usuario}= this.toObject();
    return usuario;
}




export const Usuario= model('Usuario', UsuarioSchema);