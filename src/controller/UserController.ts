import { Request, Response } from "express"; 
import { inject, injectable } from "inversify";
import { IUserUseCase } from "../usecase/UserUseCase";
import { User } from "../entity/User";

interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
}

@injectable()
export class UserController {
    readonly userInteractor: IUserUseCase;
       
    constructor(@inject("UserInteractor") userInteractor: IUserUseCase) {
        this.userInteractor = userInteractor;
    }

    // 入力データの不整合を検出
    isUser(obj: any): obj is User{
        const dtype = {name: "string", email: "string", password: "string"};
        // 予期せぬkeyが含まれていないか
        if (Object.keys(obj).some((key) => !(key in dtype))) {
            console.log("予期しないkeyが含まれています。");
            return false;
        }
        // 必要なkeyが含まれているか
        if (Object.keys(dtype).some((key) => !(key in obj))) {
            console.log("keyが不十分です。");
            return false;
        }
        // keyの型チェック
        if (Object.keys(dtype).some((key) => typeof(obj[key]) !== dtype[key])) {
            console.log("keyの型が異なります。");
            return false;
        }
        return true;
    }

    findUsers(req: Request): Promise<User[]> {
        return this.userInteractor.findUsers();
    }

    findUserByName(req: Request): Promise<User> {
        return this.userInteractor.findUserByName(req.params.name)
    }

    createUser(req: Request): Promise<User> {
        if (! this.isUser(req.body)) return Promise.reject("入力データが正しくありません。");
        else return this.userInteractor.createUser(req.body);
    }

    updateUser(req: Request): Promise<User> {
        if (! this.isUser(req.body)) return Promise.reject("入力データが正しくありません。");
        else return this.userInteractor.updateUser(req.params.name, req.body);
    }

    deleteUser(req: Request): Promise<User[]> {
        return this.userInteractor.deleteUser(req.params.name);
    }
}