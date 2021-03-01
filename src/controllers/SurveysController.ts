import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';

import { SurveysRepository } from './../repositories/SurveysRepository';

export class SurveysController {
  async create (request: Request, response: Response) {
    const { title, description } = request.body;

    const schema = yup.object().shape({
      title: yup.string().required('Título não informado!'),
      description: yup.string().required('Descrição não informada!')
    });

    await schema.validate(request.body, {
      abortEarly: false
    });

    const surveysRepository = getCustomRepository(SurveysRepository);

    const survey = surveysRepository.create({
      title,
      description
    });

    await surveysRepository.save(survey);

    return response.status(201).json(survey);
  }

  async show(request: Request, response: Response) {
    const surveysRepository = getCustomRepository(SurveysRepository);

    const allSurveys = await surveysRepository.find();

    return response.status(200).json({
      surveys: allSurveys
    });
  }
}