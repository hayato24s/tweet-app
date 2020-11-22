import { User } from "../entity/User"

export interface IUserUseCase {
    findUsers():Promise<User[]>;
    findUserByName(name: string): Promise<User>;
    createUser(data: {name: string, email: string, password: string}): Promise<User>;
    updateUser(name: string, data: {name: string, email: string, password: string}): Promise<User>;
    deleteUser(name: string): Promise<User[]>;
}