import {Router} from "express";

// import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import PendencyServicesController from "../controllers/PendencyServicesController";

const PendencyRouter = Router();

const pendencyServicesController = new PendencyServicesController();

PendencyRouter.post("/", pendencyServicesController.create )

export default PendencyRouter


