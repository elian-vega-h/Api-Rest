import { Server } from './models/server.js';
import * as dotenv from 'dotenv'; // Variables de entorno

dotenv.config();

const server= new Server();


server.listen();


