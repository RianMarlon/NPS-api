import { AppError } from './../errors/AppError';
import { SurveysUsersRepository } from './../repositories/SurveysUsersRepository';
import { Request, Response } from "express";
import { getCustomRepository } from 'typeorm';

export class AnswersController {
  async execute(request: Request, response: Response) {
    const { value } = request.params;
    const { u } = request.query;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveyUserById = await surveysUsersRepository.findOne({
      id: String(u)
    });

    if (!surveyUserById) {
      throw new AppError('Pesquisa com o usuário não existe!', 400);
    }

    surveyUserById.value = Number(value);

    await surveysUsersRepository.save(surveyUserById);

    return response.status(200).json({
      survey_user: surveyUserById
    });
  }
}