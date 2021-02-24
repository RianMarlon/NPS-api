import { Survey } from './../models/Survey';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Survey)
export class SurveysRepository extends Repository<Survey> {}