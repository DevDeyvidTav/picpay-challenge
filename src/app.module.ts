import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { InfraModule } from './domain/infra/type-orm.module';
import { UserModule } from './domain/users/user.module';
import { WalletModule } from './domain/wallet/wallet.module';
import { TransfersModule } from './domain/transfers/transfers.module';
import { NotificationsModule } from './domain/notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
        password: '',
      },
    }),
    HttpModule,
    InfraModule,
    UserModule,
    WalletModule,
    TransfersModule,
    NotificationsModule,
  ],
})
export class AppModule {}
