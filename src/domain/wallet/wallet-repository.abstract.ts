import { User } from "../users/user.entity";
import { Wallet } from "./wallet.entity";

export abstract class AbstractWalletRepository {
    abstract findById(id: string): Promise<Wallet>
    abstract findByUserId(userId: string): Promise<Wallet>
    abstract create(userId: string): Promise<Wallet>
    abstract verifyIfIsPossibleTransfer(userId: string, value: number): Promise<boolean>
    abstract creditBalance(userId: string, value: number): Promise<Wallet>
    abstract debitBalance(userId: string, value: number): Promise<Wallet>
}