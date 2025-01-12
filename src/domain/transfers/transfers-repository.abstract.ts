import { CreateTransferDto } from "./dtos/create-transfer.dto";
import { Transfers } from "./transfers.entity";

export abstract class AbstractTransfersRepository {
    abstract create(data: CreateTransferDto): Promise<Transfers>
}