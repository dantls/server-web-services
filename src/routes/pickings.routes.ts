import {Router} from "express";

// import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import PickingsController from "../controllers/PickingsController";

const PickingsRouter = Router();

const pickingsController = new PickingsController();

PickingsRouter.get("/", pickingsController.list )

export default PickingsRouter


