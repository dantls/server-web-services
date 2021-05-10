import {Router} from "express";

// import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import FinalizedServicesController from "../controllers/FinalizedServicesController";

const ServicesRouter = Router();

const finalizedServicesController = new FinalizedServicesController();

ServicesRouter.post("/", finalizedServicesController.create )

export default ServicesRouter


