import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notifications } from './notifications.entity';
import { NotificationsService } from './notifications.service';
import { NotificationsProcessor } from './notifications.processor';
import { NotificationsRepository } from './notifications.repository';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'notifications',
    }),
    TypeOrmModule.forFeature([Notifications]),
  ],
  providers: [
    NotificationsService,
    NotificationsProcessor,
    {
      provide: 'UseAbstractNotificationsRepository',
      useClass: NotificationsRepository,
    },
  ],
  exports: [NotificationsService, 'UseAbstractNotificationsRepository'],
})
export class NotificationsModule {}
