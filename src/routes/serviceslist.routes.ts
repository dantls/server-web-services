import {Router} from "express";

// import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import ServicesListController from "../controllers/ServicesListController";

const ServicesRouter = Router();

const servicesListController = new ServicesListController();

ServicesRouter.get("/", servicesListController.index )

export default ServicesRouter


