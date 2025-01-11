import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Notifications } from '../notifications/notifications.entity';
import { User } from '../users/user.entity';
import { Transfers } from '../transfers/transfers.entity';
import { Permissions } from '../permissions/permissions.entity';
import { Wallet } from '../wallet/wallet.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [
          Notifications,
          User,
          Transfers,
          Permissions,
          Wallet
        ],
        synchronize: configService.get<boolean>('DATABASE_SYNCRONIZE'),
      }),
    }),
  ],
})
export class InfraModule {}
