import { Injectable } from "@nestjs/common";
import { Transfers } from "./transfers.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateTransferDto } from "./dtos/create-transfer.dto";
import { AbstractTransfersRepository } from "./transfers-repository.abstract";
import { EntityManager } from "typeorm";

@Injectable()
export class TransfersRepository implements AbstractTransfersRepository {
    constructor (
        @InjectRepository(Transfers)
        private readonly repository
    ) {}

    async create(transfer: CreateTransferDto, manager?: EntityManager) {
        const repo = manager ? manager.getRepository(Transfers) : this.repository;
        const newTransfer = repo.create();
        newTransfer.amount = transfer.value;
        newTransfer.sender = { id: transfer.sender };
        newTransfer.receiver = { id: transfer.receiver };
        return await this.repository.save(newTransfer);
    }
    
}