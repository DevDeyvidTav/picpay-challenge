import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InfraModule } from './domain/infra/type-orm.module';
import { UserModule } from './domain/users/user.module';
import { WalletModule } from './domain/wallet/wallet.module';
import { TransfersModule } from './domain/transfers/transfers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    InfraModule,
    UserModule,
    WalletModule,
    TransfersModule
  ],
})
export class AppModule {}
