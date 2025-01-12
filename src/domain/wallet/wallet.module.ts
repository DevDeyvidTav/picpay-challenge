import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './wallet.entity';
import { WalletRepository } from './wallet.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet])],
  providers: [
    {
      provide: 'UseAbstractWalletRepository',
      useClass: WalletRepository,
    },
  ],
  exports: ['UseAbstractWalletRepository'],
})
export class WalletModule {}
