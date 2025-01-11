import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InfraModule } from './domain/infra/type-orm.module';
import { UserModule } from './domain/users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    InfraModule,
    UserModule
  ],
})
export class AppModule {}
