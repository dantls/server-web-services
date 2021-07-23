import {Router} from "express";

// import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import AddressesListController from "../controllers/AddressesListController";

const AddressesRouter = Router();

const addressesListController = new AddressesListController();

AddressesRouter.get("/", addressesListController.index )

export default AddressesRouter


