import { Router } from 'express';

import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import pointsRouter from './points.routes';
import ordersRouter from './orders.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/points', pointsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/orders', ordersRouter);


export default routes;
