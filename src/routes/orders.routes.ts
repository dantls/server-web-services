import {Router} from "express";

// import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import OrdersController from "../controllers/OrdersController";

const OrdersRouter = Router();

const ordersController = new OrdersController();

OrdersRouter.post("/", ordersController.create )

export default OrdersRouter


