import { Body, Controller, Post } from "@nestjs/common";
import { TransfersService } from "./transfers.service";
import { CreateTransferDto } from "./dtos/create-transfer.dto";

@Controller('transfers')
export class TransfersController {
    constructor (
        private readonly transfersService: TransfersService
    ) {}

    @Post()
    async create(@Body() transfer: CreateTransferDto) {
        return await this.transfersService.create(transfer);
    }
}