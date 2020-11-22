import { Repository } from "typeorm";
import {User} from "../entity/User";
import { ValidationError } from "class-validator";

export interface IUserRepository {
    userRepository: Repository<User>;
    findAllUser(): Promise<User[]>;
    findUserByName(name: string): Promise<User>;
    createUser(data: {name: string, email: string, password: string}): Promise<User>;
    updateUser(name: string, data: {name: string, email: string, password: string}): Promise<User>;
    deleteUser(name: string): Promise<User[]>;
}