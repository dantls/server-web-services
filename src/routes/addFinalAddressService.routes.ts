import {Router} from "express";

// import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import AddFinalAddressesServicesController from "../controllers/AddFinalAddressesServicesController";

const ServicesRouter = Router();

const addFinalAddressesServicesController = new AddFinalAddressesServicesController();

ServicesRouter.put("/", addFinalAddressesServicesController.update )

export default ServicesRouter


