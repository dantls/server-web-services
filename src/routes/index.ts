import { Router } from 'express';

import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import pointsRouter from './points.routes';
import ordersRouter from './orders.routes';
import servicesRouter from './services.routes';
import billedServicesRouter from './billedServices.routes';
import finalizedServicesRouter from './finalizedServices.routes';
import servicesListRouter from './serviceslist.routes';
import servicesList2Router from './serviceslist2.routes';
import listServiceByOrderRouter from './listServiceByOrder.routes';
import addressesListRouter from './addresseslist.routes';
import addressesList2Router from './addresseslist2.routes';
import finalAddressesListRouter from './finalAddresseslist.routes';
import situationsRouter from './situations.routes';
import addressesRouter from './addresses.routes';
import finalAddressesRouter from './finalAddresses.routes';
import transferServicesRouter from './transferServices.routes';
import orderTypesRouter from './orderTypes.routes';
import addOrderTypeOrderRouter from './addOrderTypeOrder.routes';
import addFinalAddressesServicesController from './addFinalAddressService.routes';
import pendencyRouter from './pendencyServices.routes';
import cancelRouter from './cancelServices.routes';

import movementsRouter from './movements.routes';
import movementsResumeRouter from './movementsResume.routes';
import pickingsRouter from './pickings.routes';
import pickingsResumeRouter from './pickingsResume.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/points', pointsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/orders', ordersRouter);
routes.use('/services', servicesRouter);
routes.use('/billed', billedServicesRouter);
routes.use('/finalized', finalizedServicesRouter);
routes.use('/list-services', servicesListRouter);
routes.use('/list-services2', servicesList2Router);
routes.use('/list-service/', listServiceByOrderRouter);
routes.use('/list-addresses', addressesListRouter);
routes.use('/list-addresses2', addressesList2Router);
routes.use('/list-finaladdresses', finalAddressesListRouter);
routes.use('/list-addresses', addressesListRouter);
routes.use('/situations', situationsRouter);
routes.use('/addresses', addressesRouter);
routes.use('/finaladdresses', finalAddressesRouter);
routes.use('/transfer', transferServicesRouter);
routes.use('/ordertypes', orderTypesRouter);
routes.use('/add-ordertype', addOrderTypeOrderRouter);
routes.use('/add-finaladdress', addFinalAddressesServicesController);
routes.use('/pendency', pendencyRouter);
routes.use('/movements', movementsRouter);
routes.use('/movements-total', movementsResumeRouter);
routes.use('/pickings', pickingsRouter);
routes.use('/pickings-total', pickingsResumeRouter);
routes.use('/cancel', cancelRouter);


export default routes;
