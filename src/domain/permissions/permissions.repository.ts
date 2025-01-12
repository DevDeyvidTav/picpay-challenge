import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Permissions } from "./permissions.entity";

@Injectable()
export class PermissionsRepository {
    constructor(
        @InjectRepository(Permissions)
        private readonly repository
    ){}

    async findAll(): Promise<Permissions[]> {
        return await this.repository.find();
    }

    async findByUserId(userId: string): Promise<Permissions[]> {
        return await this.repository.find({ where: { user: { id: userId } } });
    }
}