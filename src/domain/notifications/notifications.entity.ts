import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "../users/user.entity";

@Entity({ name: "notifications" })
export class Notifications {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User, user => user.notifications, { nullable: false })
    user: User;

    @Column({ type: "text" })
    message: string;

    @CreateDateColumn({ name: "createdAt" })
    createdAt: Date;
}
