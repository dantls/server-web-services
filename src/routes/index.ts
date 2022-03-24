import { Router } from 'express';

import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import pointsRouter from './points.routes';
import ordersRouter from './orders.routes';
import servicesRouter from './services.routes';
import billedServicesRouter from './billedServices.routes';
import finalizedServicesRouter from './finalizedServices.routes';
import servicesListRouter from './serviceslist.routes';
import listServiceByOrderRouter from './listServiceByOrder.routes';
import addressesListRouter from './addresseslist.routes';
import situationsRouter from './situations.routes';
import addressesRouter from './addresses.routes';
import transferServicesRouter from './transferServices.routes';
import orderTypesRouter from './orderTypes.routes';
import addOrderTypeOrderRouter from './addOrderTypeOrder.routes';
import pendencyRouter from './pendencyServices.routes';


const routes = Router();

routes.use('/users', usersRouter);
routes.use('/points', pointsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/orders', ordersRouter);
routes.use('/services', servicesRouter);
routes.use('/billed', billedServicesRouter);
routes.use('/finalized', finalizedServicesRouter);
routes.use('/list-services', servicesListRouter);
routes.use('/list-service/', listServiceByOrderRouter);
routes.use('/list-addresses', addressesListRouter);
routes.use('/situations', situationsRouter);
routes.use('/addresses', addressesRouter);
routes.use('/transfer', transferServicesRouter);
routes.use('/ordertypes', orderTypesRouter);
routes.use('/add-ordertype', addOrderTypeOrderRouter);
routes.use('/pendency', pendencyRouter);


export default routes;
