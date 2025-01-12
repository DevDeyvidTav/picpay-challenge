import { Module } from "@nestjs/common";
import { TransfersService } from "./transfers.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransfersRepository } from "./transfers.repository";
import { WalletModule } from "../wallet/wallet.module";
import { UserModule } from "../users/user.module";
import { PermissionsModule } from "../permissions/permissions.module";
import { TransfersController } from "./transfers.controller";
import { Transfers } from "./transfers.entity";
import { NotificationsModule } from "../notifications/notifications.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Transfers]),
    WalletModule, 
    UserModule,
    PermissionsModule, 
    NotificationsModule
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
