
interface IUser {
    id: number;
    name: string;
}

function checkType(obj: any, dtype: any): obj is IUser{
    // 変なkeyが含まれていないか
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

/*
function checkType(obj, dtype): boolean {
    // 変なkeyが含まれていないか
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

const user = {id: 1, name: "poul"}
const keydata = {id: "number", name: "string"};
console.log(user);
console.log(checkType(user, keydata));
*/


/*
function instanceOfIUser(object: any): object is IUser {
    console.log(Object.keys(object));
    return (("name" in object) && ("id" in object))
}

var user = {id: "1", "name": "poul", email: "example"};
if (instanceOfIUser(user)) {
    console.log("OK");
    console.log(typeof user.email);
} else {
    console.log("error");
}
*/




class User {
    id: number;
    name: string;
    
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}
class Controller {
    interactor = new Interactor();
    Handle1(body, errors): Promise<User> {
        return new Promise(async (resolve, reject) => {
            if (errors.length > 0) {
                reject("error");
                return;
            } else {
                let res = await this.interactor.pass(body);
                if (res instanceof User) {
                    resolve(res);
                } else {
                    reject(res);
                }
            }
        })
    }
}

class Interactor {
    pass(body): Promise<User> {
        let repository = new Repository()
        return repository.Handle2(body);
    }
}

class Repository {
    Handle2(body): Promise<User> {
       return new Promise<User>(resolve => {
           let res;
           if (Object.keys(body).length > 1) {
               res = new User(body.id, body.name);
           } else {
               res = "error in repository";
           }
           resolve(res);
       })
    }
}

const controller = new Controller();
const body: any = {name: "poul"};
const errors: string[] = [];
controller.Handle1(body, errors).then((res) => {
    console.log(`res: ${res}`);
}).catch((err) => {
    console.log(`err: ${err}`);
})




/*
function wait(): Promise<any> {
    return new Promise(resolve => {
        setTimeout(() => {
            // console.log("wait");
            resolve("wait");
        }, 2000)
    })
}


function main() {
    return wait()
        .then(() => {
            return wait();
        })
        .then(() => {
            return wait();
        })
}

// Promise を返す関数の前に await と付ける。
async function main() {
    let res = await wait();
    console.log(res);
    console.log(typeof res);
    console.log(await wait());
    console.log(await wait());

}

main();
*/

function f(x: any): Promise<string> {
    if (typeof(x) === "string") return Promise.resolve("x is string");
    else return Promise.reject("x is not string")
}

async function main(x: any) {
    console.log("start");
    const res = await f(x);
    console.log("end");
    return res;
}


const x = 1;
main(x).then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
})