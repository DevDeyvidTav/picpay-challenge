import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { WalletModule } from '../wallet/wallet.module';
import { PermissionsModule } from '../permissions/permissions.module';


@Module({
  imports: [TypeOrmModule.forFeature([User]), WalletModule, PermissionsModule],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'UseAbstractUserRepository',
      useClass: UserRepository,
    },
  ],
  exports: ['UseAbstractUserRepository'],
})
export class UserModule {}
