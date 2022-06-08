import {Router} from "express";

// import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import MovementsResumeController from "../controllers/MovementsResumeController";

const MovementsRouter = Router();

const movementsResumeController = new MovementsResumeController();

MovementsRouter.get("/", movementsResumeController.list )

export default MovementsRouter


