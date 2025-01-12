import { EntityManager } from "typeorm";
import { CreateNotificationDto } from "./dtos/create-notification.dto";
import { Notifications } from "./notifications.entity";

export abstract class AbstractNotificationsRepository {
    abstract create(notification: CreateNotificationDto, manager?: EntityManager): Promise<Notifications>;
}
