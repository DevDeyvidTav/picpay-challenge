import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "../users/user.entity";


@Entity({ name: "permissions" })
export class Permissions {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 255 })
    name: string;

    @Column({ type: "boolean", default: false })
    canSend: boolean;

    @OneToMany(() => User, user => user.permission)
    user: User;
}
