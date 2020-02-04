import { Router } from 'express';
import multer from 'multer'

import multerConfig from './config/multer';

import UserController from './app/controllers/user';
import AuthController from './app/controllers/auth';
import FileController from './app/controllers/file';
import ProviderController from './app/controllers/provider';
import AppointmentController from './app/controllers/appointment';
import ScheduleController from './app/controllers/schedule';
import NotificaionController from './app/controllers/notification.js';

import authMiddlewares from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/auth', AuthController.store);
routes.post('/users', UserController.store);

routes.use(authMiddlewares);

routes.put('/users', UserController.update);

routes.get('/providers', ProviderController.index);

routes.post('/appointments', AppointmentController.store)
routes.get('/appointments', AppointmentController.index)

routes.get('/schedules', ScheduleController.index)

routes.get('/notifications', NotificaionController.index)

routes.post('/files', upload.single('file'), FileController.store);


export default routes;
