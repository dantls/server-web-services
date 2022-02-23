import {Router} from "express";

// import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import TransferServicesController from "../controllers/TransferServicesController";

const transferRouter = Router();

const transferServicesController = new TransferServicesController();

transferRouter.post("/", transferServicesController.create )

export default transferRouter


