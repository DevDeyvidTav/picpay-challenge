import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { CreateUserDto } from "./dtos/create-user.dto";
import { AbstractUserRepository } from "./user-repository.abstract";

@Injectable()
export class UserRepository implements AbstractUserRepository {
    constructor(
        @InjectRepository(User)
        private readonly repository
    ) {}

    async create(user: CreateUserDto) {
        return await this.repository.save(user);
    }

    async findByEmail(email: string) {
        return await this.repository.findOne({ email });
    }

    async findById(id: string) {
        return await this.repository.findOne(id);
    }

    async findAll() {
        return await this.repository.find();
    }

    async findByCpf(cpf: string) {
        return await this.repository.findOne({ cpf });
    }
}