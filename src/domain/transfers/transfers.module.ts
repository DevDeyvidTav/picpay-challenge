import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransfersService } from './transfers.service';
import { TransfersRepository } from './transfers.repository';
import { WalletModule } from '../wallet/wallet.module';
import { UserModule } from '../users/user.module';
import { PermissionsModule } from '../permissions/permissions.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { TransfersController } from './transfers.controller';
import { Transfers } from './transfers.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transfers]),
    WalletModule,
    UserModule,
    PermissionsModule,
    NotificationsModule, // Certifique-se de importar
  ],
  providers: [
    TransfersService,
    {
      provide: 'UseAbstractTransfersRepository',
      useClass: TransfersRepository,
    },
  ],
  controllers: [TransfersController],
  exports: ['UseAbstractTransfersRepository'],
})
export class TransfersModule {}
