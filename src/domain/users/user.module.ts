import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'UseAbstractUserRepository',
      useClass: UserRepository,
    },
  ],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [],
})
export class UserModule {}
