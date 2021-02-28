import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { SurveyUser } from './SurveyUser';

@Entity('users')
export class User {
  @PrimaryColumn('uuid')
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

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