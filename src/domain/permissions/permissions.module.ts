import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permissions } from './permissions.entity';
import { PermissionsRepository } from './permissions.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Permissions])],
  providers: [
    {
      provide: 'UsePermissionsRepository',
      useClass: PermissionsRepository,
    },
  ],
  exports: ['UsePermissionsRepository'],
})
export class PermissionsModule {}
