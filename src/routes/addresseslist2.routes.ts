import {Router} from "express";

// import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import AddressesList2Controller from "../controllers/AddressesList2Controller";

const Addresses2Router = Router();

const addressesList2Controller = new AddressesList2Controller();

Addresses2Router.get("/", addressesList2Controller.index )

export default Addresses2Router


