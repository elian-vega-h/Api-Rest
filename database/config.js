
import mongoose from "mongoose";



const dbConnection= async() =>{
    try {
        await mongoose.connect(process.env.mongoDB);
        
    } catch (error) {
        throw new Error('Error a la hora de iniciar la base de datos')
    }
}


export{dbConnection}