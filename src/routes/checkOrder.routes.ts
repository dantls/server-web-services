import {Router} from "express";

// import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import CheckOrderController from "../controllers/CheckOrderController";

const CheckOrderRouter = Router();

const checkOrderController = new CheckOrderController();

CheckOrderRouter.get("/", checkOrderController.index )

export default CheckOrderRouter


