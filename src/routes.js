import { Router } from 'express';
import multer from 'multer'

import multerConfig from './config/multer';

import UserController from './app/controllers/user';
import AuthController from './app/controllers/auth';
import FileController from './app/controllers/file-controller';
import ProviderController from './app/controllers/provider-controller';

import authMiddlewares from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/auth', AuthController.store);
routes.post('/users', UserController.store);

routes.use(authMiddlewares);

routes.put('/users', UserController.update);
routes.post('/files', upload.single('file'), FileController.store);
routes.get('/providers', ProviderController.index);


export default routes;
