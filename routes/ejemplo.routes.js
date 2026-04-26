import {Router} from 'express';
import {getALLEjemplo, getEjemploById, postEjemplo, putEjemplo, deleteEjemplo } from '../controllers/ejemplo.controller.js';
const ejemplo = Router();


ejemplo.get ('/',getALLEjemplo );
ejemplo.get ('/:id', getEjemploById );


ejemplo.put ('/:id', putEjemplo );

ejemplo.post ('/', postEjemplo );

ejemplo.delete ('/:id', deleteEjemplo );



export default ejemplo;