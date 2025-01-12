import { Permissions } from "./permissions.entity";

export abstract class AbstractPermissionsRepository {
    abstract findAll(): Promise<Permissions[]>
    abstract findByUserId(userId: string): Promise<Permissions[]>
}