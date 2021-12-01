import {Router} from "express";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import SituationsController from "../controllers/SituationsController";
import ListSituationsController from "../controllers/ListSituationsController";

const situationsRouter = Router();

const situationsController = new SituationsController();
const listSituationsController = new ListSituationsController();

// usersRouter.use(ensureAuthenticated)
//usersRouter.post("/", ensureAuthenticated, usersController.create )

situationsRouter.post("/",situationsController.create )
situationsRouter.get("/",listSituationsController.index )


export default situationsRouter


