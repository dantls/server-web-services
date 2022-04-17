import {Router} from "express";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import FinalAddressesController from "../controllers/FinalAddressesController";

const finalAddressesRouter = Router();

const finalAddressesController = new FinalAddressesController();

// usersRouter.use(ensureAuthenticated)
//usersRouter.post("/", ensureAuthenticated, usersController.create )

finalAddressesRouter.post("/",finalAddressesController.create )


export default finalAddressesRouter


