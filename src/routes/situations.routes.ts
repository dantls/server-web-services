import {Router} from "express";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import SituationsController from "../controllers/SituationsController";

const situationsRouter = Router();

const situationsController = new SituationsController();

// usersRouter.use(ensureAuthenticated)
//usersRouter.post("/", ensureAuthenticated, usersController.create )

situationsRouter.post("/",situationsController.create )


export default situationsRouter


