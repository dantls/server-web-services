import {Router} from "express";

// import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import SamplesController from "../controllers/SamplesController";

const SamplesRouter = Router();

const samplesController = new SamplesController();

SamplesRouter.get("/", samplesController.list )

export default SamplesRouter


