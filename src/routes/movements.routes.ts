import {Router} from "express";

// import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import MovementsController from "../controllers/MovementsController";

const MovementsRouter = Router();

const movementsController = new MovementsController();

MovementsRouter.get("/", movementsController.list )

export default MovementsRouter


