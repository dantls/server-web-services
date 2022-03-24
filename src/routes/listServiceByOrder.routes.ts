import {Router} from "express";

// import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import ListServiceByOrderController from "../controllers/ListServiceByOrderController";

const ListServiceRouter = Router();

const listServiceByOrderController = new ListServiceByOrderController();

ListServiceRouter.get("/:order", listServiceByOrderController.index )

export default ListServiceRouter


