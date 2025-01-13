import { Injectable } from "@nestjs/common";
import { Wallet } from "./wallet.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, EntityManager } from "typeorm";

@Injectable()
export class WalletRepository {
  constructor(
    @InjectRepository(Wallet)
    private readonly repository: Repository<Wallet>,
  ) {}

  async findByUserId(userId: string, manager?: EntityManager): Promise<Wallet> {
    const repo = manager ? manager.getRepository(Wallet) : this.repository;
    return await repo.findOne({ where: { user: { id: userId } } });
  }

  async create(userId: string, manager?: EntityManager): Promise<Wallet> {
    const repo = manager ? manager.getRepository(Wallet) : this.repository;
    const wallet = repo.create({
      user: { id: userId },
      balance: 0,
    });
    return await repo.save(wallet);
  }

  async verifyIfIsPossibleTransfer(userId: string, value: number, manager?: EntityManager): Promise<boolean> {
    const userWallet = await this.findByUserId(userId, manager);
    if (!userWallet || userWallet.balance < value) {
      return false;
    }
    return true;
  }

  async creditBalance(userId: string, value: number, manager?: EntityManager): Promise<Wallet> {
    const userWallet = await this.findByUserId(userId, manager);
    if (!userWallet) {
      throw new Error("Carteira não encontrada");
    }
    userWallet.balance += value;

    const repo = manager ? manager.getRepository(Wallet) : this.repository;
    return await repo.save(userWallet);
  }

  async debitBalance(userId: string, value: number, manager?: EntityManager): Promise<Wallet> {
    try {
      const userWallet = await this.findByUserId(userId, manager);
      if (!userWallet) {
        throw new Error("Carteira não encontrada");
      }
      userWallet.balance -= value;
  
      const repo = manager ? manager.getRepository(Wallet) : this.repository;
      return await repo.save(userWallet);
    } catch (error) {
      throw error
    }
  }
}
