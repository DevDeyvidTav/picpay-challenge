import { Injectable } from "@nestjs/common";
import { Wallet } from "./wallet.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../users/user.entity";

@Injectable()
export class WalletRepository {
    constructor(
        @InjectRepository(Wallet)
        private readonly repository
    ) {}

    async findByUserId(userId: string) {
        return await this.repository.findOne({ userId });
    }

    async create(userId: string) {
        const wallet = this.repository.create({
          user: { id: userId }, // Passa o objeto User com o id
          balance: 0,
        });      
        return await this.repository.save(wallet);
      }
    async verifyIfIsPossibleTransfer(userId: string, value: number) {
        const userWallet = await this.findByUserId(userId);

        if (userWallet.balance < value) {
            return false;
        }

        return true;
    }

    async creditBalance(userId: string, value: number) {
        const userWallet = await this.findByUserId(userId);
        userWallet.balance += value;
        return await this.repository.save(userWallet);
    }

    async debitBalance(userId: string, value: number) {
        const userWallet = await this.findByUserId(userId);
        userWallet.balance -= value;
        return await this.repository.save(userWallet);
    }
}