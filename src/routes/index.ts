import { Router } from 'express';

import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import pointsRouter from './points.routes';
import ordersRouter from './orders.routes';
import servicesRouter from './services.routes';
import billedServicesRouter from './billedServices.routes';
import finalizedServicesRouter from './finalizedServices.routes';
import servicesListRouter from './serviceslist.routes';
import situationsRouter from './situations.routes';
import addressesRouter from './addresses.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/points', pointsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/orders', ordersRouter);
routes.use('/services', servicesRouter);
routes.use('/billed', billedServicesRouter);
routes.use('/finalized', finalizedServicesRouter);
routes.use('/list-services', servicesListRouter);
routes.use('/situations', situationsRouter);
routes.use('/addresses', addressesRouter);


export default routes;
