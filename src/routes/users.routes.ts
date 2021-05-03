import {Router, Request, Response} from "express";

import ensureAuthenticated from "../middlewares/ensureAuthenticated";

import UsersController from "../controllers/UsersController";

const usersRouter = Router();

const usersController = new UsersController();

// usersRouter.use(ensureAuthenticated)
//usersRouter.post("/", ensureAuthenticated, usersController.create )

usersRouter.post("/", ensureAuthenticated,usersController.create )


export default usersRouter


