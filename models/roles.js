import { Schema, model } from "mongoose";

const RolSchema= Schema({
    rol:{
        type: String,
        required: [true, 'el rol es obligatorio']
    }

});



export const rols= model('rols', RolSchema);