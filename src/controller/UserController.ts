import { inject, injectable } from "inversify";
import { IUserUseCase } from "../usecase/UserUseCase";
import { User } from "../entity/User";
import { AdvancedConsoleLogger } from "typeorm";
import { Request, Response } from "express"; 
import { validateOrReject } from "class-validator";
import { isNullOrUndefined } from "util";

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
           console.log("check keys");
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

       findAllUser(req: Request): Promise<User[]> {
           return this.userInteractor.findAllUser();
       }

       findUserByName(req: Response): Promise<User> {
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


/*
export class UserController {

    private userRepository = getRepository(User);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.userRepository.findOne(request.params.id);
        await this.userRepository.remove(userToRemove);
    }
}
*/


/*
//　自作
export class UserController {

    private userRepository = getRepository(User);

    async getAllUser(req: Request, res: Response, next: NextFunction) {
        return await this.userRepository.find();
    }

    async getOneUser(req: Request, res: Response, next: NextFunction) {
        return this.userRepository.findOne({id: req.params.id});
    }

    async createUser(req: Request, res: Response, next: NextFunction) {
        return await this.userRepository.save(req.body);
    }

    async updateUser(req: Request, res: Response, next: NextFunction) {
        return await this.userRepository.save(req.body);
    }

    async deleteUser(req: Request, res: Response, next: NextFunction) {
        let user = await this.userRepository.findOne({id: req.params.id})
        await this.userRepository.remove(user);
        return await this.userRepository.find();
    }
}
*/