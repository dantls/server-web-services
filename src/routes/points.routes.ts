import {Router} from "express";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import PointsController from "../controllers/PointsController";

const PointsRouter = Router();

const pointsController = new PointsController();

PointsRouter.post("/", ensureAuthenticated, pointsController.create )

export default PointsRouter


