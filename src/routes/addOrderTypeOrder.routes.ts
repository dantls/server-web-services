import {Router} from "express";

// import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import AddOrderTypeInOrdersController from "../controllers/AddOrderTypeInOrdersController";

const OrdersRouter = Router();

const addOrderTypeOrderController = new AddOrderTypeInOrdersController();

OrdersRouter.put("/", addOrderTypeOrderController.update )

export default OrdersRouter


