import ejemplo from "./ejemplo.routes.js";
import { Router } from "express";
const indexRouters = Router();

indexRouters.use( '/ejemplo', ejemplo );


export default indexRouters;