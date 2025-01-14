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
        const newUser = this.repository.create(user);
        newUser.permission = {id: user.permission};
        return await this.repository.save(newUser);
    }

    async findByEmail(email: string) {
        return await this.repository.findOne({ where: { email } });
    }

    async findById(id: string) {
        return await this.repository.findOne({ where: { id } });
    }

    async findAll() {
        return await this.repository.find();
    }

    async findByCpf(cpf: string) {
        return await this.repository.findOne({ where: { cpf } });
    }
}