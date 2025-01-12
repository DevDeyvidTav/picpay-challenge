import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notifications } from './notifications.entity';
import { NotificationsRepository } from './notifications.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Notifications])],
  providers: [
    {
      provide: 'UseAbstractNotificationsRepository',
      useClass: NotificationsRepository,
    },
  ],
  exports: ['UseAbstractNotificationsRepository'], 
})
export class NotificationsModule {}
