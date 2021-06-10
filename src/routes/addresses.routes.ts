import {Router} from "express";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import AddressesController from "../controllers/AddressesController";

const addressesRouter = Router();

const addressesController = new AddressesController();

// usersRouter.use(ensureAuthenticated)
//usersRouter.post("/", ensureAuthenticated, usersController.create )

addressesRouter.post("/",addressesController.create )


export default addressesRouter


