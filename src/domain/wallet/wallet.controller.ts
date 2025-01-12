import { Controller, Get, Param } from '@nestjs/common';
import { WalletService } from './wallet.service';

@Controller('wallets')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('/:userId')
  async findByUserId(@Param('userId') userId: string) {
    return await this.walletService.getByUserId(userId);
  }
}
