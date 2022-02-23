import {Router} from "express";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import OrderTypesController from "../controllers/OrderTypesController";
import ListOrderTypesController from "../controllers/ListOrderTypesController";

const orderTypesRouter = Router();

const orderTypesController = new OrderTypesController();
const listOrderTypesController = new ListOrderTypesController();

// usersRouter.use(ensureAuthenticated)
//usersRouter.post("/", ensureAuthenticated, usersController.create )

orderTypesRouter.post("/", orderTypesController.create )
orderTypesRouter.get("/",listOrderTypesController.index )


export default orderTypesRouter


