import {Router} from "express";

// import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import ServicesController from "../controllers/ServicesController";

const ServicesRouter = Router();

const servicesController = new ServicesController();

ServicesRouter.post("/", servicesController.create )

export default ServicesRouter


