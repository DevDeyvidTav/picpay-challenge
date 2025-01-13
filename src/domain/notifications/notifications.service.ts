import { Inject, Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { CreateNotificationDto } from './dtos/create-notification.dto';
import { NotificationsRepository } from './notifications.repository';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectQueue('notifications') private readonly notificationsQueue: Queue,
    @Inject('UseAbstractNotificationsRepository')
    private readonly notificationsRepository: NotificationsRepository,
  ) {}

  async createAndEnqueue(notificationDto: CreateNotificationDto) {
    console.log(`Enfileirando job:`, {
      message: notificationDto.message,
      userId: notificationDto.userId,
    });

    await this.notificationsQueue.add('send', {
        message: notificationDto.message,
        userId: notificationDto.userId,
      }, {
        attempts: 5, 
        backoff: 5000, 
      });
      

    return { status: 'enqueued', ...notificationDto };
  }

  async saveNotification(notificationDto: CreateNotificationDto) {
    const notification = await this.notificationsRepository.create(notificationDto);
    return notification;
  }
}
