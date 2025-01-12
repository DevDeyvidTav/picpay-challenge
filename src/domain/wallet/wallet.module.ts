import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './wallet.entity';
import { WalletRepository } from './wallet.repository';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet])],
  providers: [
    WalletService,
    {
      provide: 'UseAbstractWalletRepository',
      useClass: WalletRepository,
    },
  ],
  controllers: [WalletController],
  exports: ['UseAbstractWalletRepository'],
})
export class WalletModule {}
