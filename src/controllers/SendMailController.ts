import { getCustomRepository } from 'typeorm';
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

    // TODO - Salvar as informações na tabela
    const surveyUser = surveysUsersRepository.create({
      user: userByEmail,
      survey: surveyById
    });

    await surveysUsersRepository.save(surveyUser);

    // TODO - Enviar e-mail para o usuário

    await SendMailService.execute(email, surveyById.title, surveyById.description);

    return response.status(201).json({
      survey_user: surveyUser
    });
  }
}