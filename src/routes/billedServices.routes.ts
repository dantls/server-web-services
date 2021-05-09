import {Router} from "express";

// import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import BilledServicesController from "../controllers/BilledServicesController";

const ServicesRouter = Router();

const billedServicesController = new BilledServicesController();

ServicesRouter.post("/", billedServicesController.create )

export default ServicesRouter


