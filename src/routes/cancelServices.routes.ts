import {Router} from "express";

// import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import CancelServicesController from "../controllers/CancelServicesController";

const CancelRouter = Router();

const cancelServicesController = new CancelServicesController();

CancelRouter.post("/", cancelServicesController.create )

export default CancelRouter


