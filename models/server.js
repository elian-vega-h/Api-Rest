import express from 'express'; // permite crear un webserver express
import cors from 'cors';
import { router }  from '../routes/user.js';
import { dbConnection } from '../database/config.js';

class Server{

    constructor(){
        this.app= express();
        this.port = process.env.PORT;
        this.userPath= '/api/usuarios';

        //conexion de db
        this.conectarDB();
        
        // Midlewares: funciones que añaden mas funcionalidad al web server
        this.middlewares();


        // Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){

        // CORS
        this.app.use(cors());

        // parseo y lectura
        this.app.use(express.json());


        // directorios publicos
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.userPath, router);
    }

    listen(){
        this.app.listen(this.port);
    }
    

}

export {Server};