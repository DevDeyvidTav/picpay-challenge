import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";


@Entity({ name: "transfers" })
export class Transfers {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => User, user => user.sentTransfers)
    sender: User;

    @ManyToOne(() => User, user => user.transfers)
    receiver: User;

    @Column({ name: "amount", type: "numeric" })
    amount: number;
    
    @Column({ name: "createdAt", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date
}
