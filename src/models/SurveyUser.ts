import { User } from './User';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Survey } from './Survey';

@Entity('surveys_users')
export class SurveyUser {
  @PrimaryColumn('uuid')
  readonly id: string;

  @Column({ nullable: true })
  value: number;

  @ManyToOne(
    () => User,
    user => user.surveys_users
  )
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(
    () => Survey,
    survey => survey.surveys_users
  )
  @JoinColumn({ name: 'survey_id' })
  survey: Survey;

  @CreateDateColumn()
  created_at: Date

  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }
}