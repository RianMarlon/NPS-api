import { Router } from 'express';

import { UsersController } from './controllers/UsersController';
import { SurveysController } from './controllers/SurveysController';
import { SendMailController } from './controllers/SendMailController';
import { AnswersController } from './controllers/AnswersController';
import { NpsController } from './controllers/NpsController';

const routes = Router();

const usersController = new UsersController();
const surveysController = new SurveysController();
const sendMailController = new SendMailController();
const answersController = new AnswersController();
const npsController = new NpsController();

routes.post('/users', usersController.create);

routes.get('/surveys', surveysController.show);
routes.post('/surveys', surveysController.create);

routes.post('/send-mail', sendMailController.execute);

routes.get('/answers/:value', answersController.execute);

routes.get('/nps/:survey_id', npsController.execute);

export default routes;