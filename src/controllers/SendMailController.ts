import { getCustomRepository } from 'typeorm';
import { resolve } from 'path';

import { UsersRepository } from './../repositories/UsersRepository';
import { Request, Response } from 'express';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import SendMailService from '../services/SendMailService';

export class SendMailController {
  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const userByEmail = await usersRepository.findOne({
      email
    });

    if (!userByEmail) {
      return response.status(400).json({
        errorMessages: ['Usuário não existe!']
      })
    }

    const surveyById = await surveysRepository.findOne({
      id: survey_id
    });
    
    if (!surveyById) {
      return response.status(400).json({
        errorMessages: ['Pesquisa não existe!']
      });
    }

    const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
      where: {
        user: {
          id: userByEmail.id
        },
        survey: {
          id: surveyById.id
        }
      }
    });

    const npsPath = resolve(__dirname, '..', 'templates', 'emails', 'npsMail.hbs');

    const variables = {
      name: userByEmail.name,
      title: surveyById.title,
      description: surveyById.description,
      id: '',
      link: process.env.URL_MAIL
    }

    if (surveyUserAlreadyExists && surveyUserAlreadyExists.value !== null) {
      return response.status(400).json({
        errorMessages: ['Pesquisa já respondida!']
      });
    }

    else if (surveyUserAlreadyExists && surveyUserAlreadyExists.value === null) {
      variables.id = surveyUserAlreadyExists.id;

      await SendMailService.execute(email, surveyById.title, variables, npsPath);
      
      return response.status(201).json({
        survey_user: surveyUserAlreadyExists
      });
    }

    else {
      const surveyUser = surveysUsersRepository.create({
        user: userByEmail,
        survey: surveyById
      });
  
      await surveysUsersRepository.save(surveyUser);
  
      variables.id = surveyUser.id;
  
      await SendMailService.execute(email, surveyById.title, variables, npsPath);
  
      return response.status(201).json({
        survey_user: surveyUser
      });
    }
  }
}