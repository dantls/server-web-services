import {Router} from "express";

// import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import ServicesList2Controller from "../controllers/ServicesList2Controller";

const ServicesRouter = Router();

const servicesList2Controller = new ServicesList2Controller();

ServicesRouter.get("/", servicesList2Controller.index )

export default ServicesRouter


