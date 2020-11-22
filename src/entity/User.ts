import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, Unique, } from "typeorm";
import { IsEmail, Length } from "class-validator";
import { Post } from "./Post"

@Entity()
@Unique(["name"])
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @Length(1, 20, { message: "ユーザー名は1文字以上20文字以内です。" })
    name: string;

    @Column()
    @IsEmail({}, {message: "メールアドレスが正しくありません。"})
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;
    
    @OneToMany(type => Post, post => post.user )
    posts: Post[];
}
