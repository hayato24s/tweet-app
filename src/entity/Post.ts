import { Length } from "class-validator";
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn} from  "typeorm";
import {User} from "./User";

@Entity()
export class Post {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @Length(1, 140, { message: "ツイートは1文字以上140文字以内です。" })
    content: string;

    @Column()
    userId: string;

    @ManyToOne(type => User, user => user.posts, { onDelete: "CASCADE" })
    user: User;
} 