import { Router } from 'express';

import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import pointsRouter from './points.routes';
import ordersRouter from './orders.routes';
import servicesRouter from './services.routes';
import billedServicesRouter from './billedServices.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/points', pointsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/orders', ordersRouter);
routes.use('/services', servicesRouter);
routes.use('/billed', billedServicesRouter);


export default routes;
