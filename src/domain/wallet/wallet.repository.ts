import { Injectable } from "@nestjs/common";
import { Wallet } from "./wallet.entity";
import { InjectRepository } from "@nestjs/typeorm";

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
        const wallet = this.repository.create();
        wallet.userId = userId;
        wallet.balance = 0;

        return await this.repository.save(wallet);
    }
}