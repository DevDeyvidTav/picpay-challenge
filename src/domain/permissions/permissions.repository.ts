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

    async findByUserId(userId: string): Promise<Permissions | null> {
        return await this.repository.findOne({
            where: { user: { id: userId } },
            relations: ['user'], // Garante que o relacionamento é carregado
        });
    }
}