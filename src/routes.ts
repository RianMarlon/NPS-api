import { Router } from 'express';

import { UsersController } from './controllers/UsersController';
import { SurveysController } from './controllers/SurveysController';
import { SendMailController } from './controllers/SendMailController';

const routes = Router();

const usersController = new UsersController();
const surveysController = new SurveysController();
const sendMailController = new SendMailController();

routes.post('/users', usersController.create);

routes.get('/surveys', surveysController.show);
routes.post('/surveys', surveysController.create);

routes.post('/send-mail', sendMailController.execute);

export default routes;