import {Router} from "express";

// import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import ServicesController from "../controllers/ServicesController";

const PointsRouter = Router();

const pointsController = new ServicesController();

PointsRouter.post("/", pointsController.create )

export default PointsRouter


