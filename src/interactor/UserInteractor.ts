import { inject, injectable } from "inversify";
import { User } from "../entity/User";
import { IUserUseCase } from "../usecase/UserUseCase";
import { IUserRepository } from "../repository/IUserRepository";
import { ValidationError } from "class-validator";

@injectable()
export class UserInteractor implements IUserUseCase {
    readonly userRepository: IUserRepository;

    constructor(@inject("UserRepository") userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }
    findAllUser(): Promise<User[]> {
        return this.userRepository.findAllUser();
    }
    findUserByName(name: string): Promise<User> {
        return this.userRepository.findUserByName(name);
    }
    createUser(data: {name: string, email: string, password: string}): Promise<User> {
        return　this.userRepository.createUser(data)
    }

    updateUser(name: string, data: {name: string, email: string, password: string}): Promise<User> {
        return this.userRepository.updateUser(name, data);
    }
    deleteUser(name: string): Promise<User[]> {
        return this.userRepository.deleteUser(name);
    }
}