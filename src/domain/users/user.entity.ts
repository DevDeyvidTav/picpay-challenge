import { Column, Entity, PrimaryColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Transfers } from "../transfers/transfers.entity";
import { Wallet } from "../wallet/wallet.entity";
import { Permissions } from "../permissions/permissions.entity";
import { Notifications } from "../notifications/notifications.entity";

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn('uuid') // Gera automaticamente um UUID
    id: string;


    @Column({ name: "fullName", type: "varchar" })
    fullName: string;

    @Column({ name: "email", type: "varchar", unique: true })
    email: string;

    @Column({ name: "password", type: "varchar" })
    password: string;

    @Column({ name: "cpf", type: "varchar", unique: true })
    cpf: string;

    @OneToMany(() => Transfers, transfer => transfer.sender)
    sentTransfers: Transfers[];

    @OneToMany(() => Transfers, transfer => transfer.receiver)
    transfers: Transfers[];

    @OneToOne(() => Permissions, permission => permission.user)
    permission: Permissions;

    @OneToOne(() => Wallet, wallet => wallet.user)
    wallet: Wallet;

    @OneToMany(() => Notifications, notification => notification.user)
    notifications: Notifications[]

    @Column({ name: "createdAt", type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date
}
