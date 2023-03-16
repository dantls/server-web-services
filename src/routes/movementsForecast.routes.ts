import {Router} from "express";

// import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import MovementsForecastController from "../controllers/MovementsForecastController";

const MovementsRouter = Router();

const movementsForecastController = new MovementsForecastController();

MovementsRouter.get("/", movementsForecastController.list )

export default MovementsRouter


