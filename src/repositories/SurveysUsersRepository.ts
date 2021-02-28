import { SurveyUser } from './../models/SurveyUser';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(SurveyUser)
export class SurveysUsersRepository extends Repository<SurveyUser> {}