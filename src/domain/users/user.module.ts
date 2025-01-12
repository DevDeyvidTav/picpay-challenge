import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { WalletModule } from '../wallet/wallet.module';


@Module({
  imports: [TypeOrmModule.forFeature([User]), WalletModule],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'UseAbstractUserRepository',
      useClass: UserRepository,
    },
  ],
})
export class UserModule {}
