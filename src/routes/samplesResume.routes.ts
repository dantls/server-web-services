import {Router} from "express";

// import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import SamplesResumeController from "../controllers/SamplesResumeController";

const SamplesResumeRouter = Router();

const samplesResumeController = new SamplesResumeController();

SamplesResumeRouter.get("/", samplesResumeController.list )

export default SamplesResumeRouter


