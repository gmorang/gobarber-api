import { Router } from 'express';
import multer from 'multer'

import multerConfig from './config/multer';

import UserController from './app/controllers/user';
import AuthController from './app/controllers/auth';

import authMiddlewares from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/auth', AuthController.store);
routes.post('/users', UserController.store);

routes.use(authMiddlewares);

routes.put('/users', UserController.update);
routes.post('/files', upload.single('file'), (req, res) => res.json({ ok: true }))


export default routes;
