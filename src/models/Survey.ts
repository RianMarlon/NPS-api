import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { SurveyUser } from './SurveyUser';

@Entity('surveys')
export class Survey {
  @PrimaryColumn('uuid')
  readonly id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(
    () => SurveyUser,
    surveyUser => surveyUser.user
  )
  surveys_users: SurveyUser[];

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }
}