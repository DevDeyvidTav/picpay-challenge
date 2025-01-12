import { Abstract, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Notifications } from "./notifications.entity";
import { CreateNotificationDto } from "./dtos/create-notification.dto";
import { EntityManager } from "typeorm";
import { AbstractNotificationsRepository } from "./notifications-repository.abstract";

@Injectable()
export class NotificationsRepository implements AbstractNotificationsRepository {
    constructor(
        @InjectRepository(Notifications)
        private readonly repository
    ) {}
    async create(notification: CreateNotificationDto, manager?: EntityManager) {
        const repo = manager ? manager.getRepository(Notifications) : this.repository;
        const newNotification = repo.create()
        newNotification.message = notification.message;
        newNotification.user = { id: notification.userId };
        return await this.repository.save(newNotification);
    }
}