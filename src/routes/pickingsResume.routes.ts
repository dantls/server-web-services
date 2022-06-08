import {Router} from "express";

// import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import PickingsResumeController from "../controllers/PickingsResumeController";

const PickingsResumeRouter = Router();

const pickingsResumeController = new PickingsResumeController();

PickingsResumeRouter.get("/", pickingsResumeController.list )

export default PickingsResumeRouter


