import { SurveysUsersRepository } from './../repositories/SurveysUsersRepository';
import { Request, Response } from "express";
import { getCustomRepository, IsNull, Not } from "typeorm";

export class NpsController {
  async execute (request: Request, response: Response) {
    const { survey_id } = request.params;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveysUsersByIdSurvey = await surveysUsersRepository.find({
      value: Not(IsNull()),
      survey: {
        id: survey_id,
      }
    });

    const detractors = surveysUsersByIdSurvey.filter(survey => 
      (survey.value >= 0 && survey.value <= 6)
    ).length;

    const passives = surveysUsersByIdSurvey.filter(survey => 
      (survey.value >= 7 && survey.value <= 8)
    ).length;

    const promoters = surveysUsersByIdSurvey.filter(survey => 
      (survey.value >= 9 && survey.value <= 10)
    ).length;

    const totalAnswers = surveysUsersByIdSurvey.length;

    const calculate = Number(
      (((promoters - detractors) / totalAnswers) * 100).toFixed(2)
    );

    return response.status(200).json({
      detractors,
      passives,
      promoters,
      total_answers: totalAnswers,
      nps: calculate
    });
  }
}