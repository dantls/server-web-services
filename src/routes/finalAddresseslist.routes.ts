import {Router} from "express";

// import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import FinalAddressesListController from "../controllers/FinalAddressesListController";

const AddressesRouter = Router();

const addressesListController = new FinalAddressesListController();

AddressesRouter.get("/", addressesListController.index )

export default AddressesRouter


