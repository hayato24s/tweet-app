import { User } from "../entity/User"
import { ValidationError } from "class-validator";

export interface IUserUseCase {
    findAllUser():Promise<User[]>;
    findUserByName(name: string): Promise<User>;
    createUser(data: {name: string, email: string, password: string}): Promise<User>;
    updateUser(name: string, data: {name: string, email: string, password: string}): Promise<User>;
    deleteUser(name: string): Promise<User[]>;
}