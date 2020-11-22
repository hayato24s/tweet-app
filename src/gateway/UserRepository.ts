import { getRepository, Repository } from "typeorm";
import { validate, validateOrReject, ValidationError } from "class-validator";
import { injectable } from "inversify";
import { User } from "../entity/User";
import { IUserRepository } from "../repository/IUserRepository";
import { resolve } from "url";



@injectable()
export class UserRepository implements IUserRepository {

    userRepository: Repository<User> = getRepository(User);

    findAllUser(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findUserByName(name: string): Promise<User> {
        const user = await this.userRepository.findOne({ name: name });
        if (user) return user;
        else return Promise.reject("該当するユーザーが見つかりません。");
    }

    
    createUser(data: {name: string, email: string, password: string}): Promise<User> {
        return new Promise(async (resolve, reject) => {
            const user = new User();
            Object.keys(data).forEach((key) => {
                user[key] = data[key];
            })
            const errors: ValidationError[] = await validate(user);
            if (errors.length > 0) {
                reject(errors);
            }
            this.userRepository.save(user).then((res) => {
                resolve(res);
            }).catch((err) => {
                if (err["errno"] === 1062) {
                    reject("入力されたユーザー名はすでに使われております。");
                }
            })
        })
    }

    async updateUser(name: string, data: {name: string, email: string, password: string}): Promise<User> {
        const user = await this.findUserByName(name);
        return new Promise(async (resolve, reject) => {
            Object.keys(data).forEach((key) => {
                user[key] = data[key];
            })
            const errors = await validate(user);
            if (errors.length > 0) {
                reject(`更新できませんでした。\n${errors}`);
            }
            this.userRepository.save(user).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            })
        })
    }
    
    async deleteUser(name: string): Promise<User[]> {
        const user = await this.findUserByName(name);
        await this.userRepository.remove(user).catch((err) => {
            Promise.reject(err);
        })
        return this.findAllUser();
    }
}