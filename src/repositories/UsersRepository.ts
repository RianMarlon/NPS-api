import { User } from './../models/User';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {}