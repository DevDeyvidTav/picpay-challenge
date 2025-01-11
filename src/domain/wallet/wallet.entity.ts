import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { User } from "../users/user.entity";


@Entity({ name: "wallet" })
export class Wallet {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToOne(() => User, user => user.wallet)
    @JoinColumn({ name: "userId" })
    user: User;

    @Column({ type: "float", default: 0 })
    balance: number;

    @Column({name: "createdAt", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date
}
