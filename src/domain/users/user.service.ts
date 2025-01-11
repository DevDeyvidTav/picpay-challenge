import { BadRequestException, Injectable, InternalServerErrorException, Inject } from "@nestjs/common";
import { AbstractUserRepository } from "./user-repository.abstract";
import { CreateUserDto } from "./dtos/create-user.dto";

@Injectable()
export class UserService {
    constructor(
        @Inject('UseAbstractUserRepository')
        private readonly repository: AbstractUserRepository,
    ) {}

    async create(user: CreateUserDto) {
        try {
            const [emailExists, cpfExists] = await Promise.all([
                this.repository.findByEmail(user.email),
                this.repository.findByCpf(user.cpf),
            ]);

            if (emailExists) {
                throw new BadRequestException('Já existe um usuário com esse email');
            }

            if (cpfExists) {
                throw new BadRequestException('Já existe um usuário com esse cpf');
            }

            return await this.repository.create(user);
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            throw new InternalServerErrorException('Erro ao criar usuário');
        }
    }

    async findAll() {
        try {
            return await this.repository.findAll();
        } catch (error) {
            console.error('Erro ao buscar todos os usuários:', error);
            throw new InternalServerErrorException('Erro ao buscar usuários');
        }
    }

    async findById(id: string) {
        try {
            const user = await this.repository.findById(id);
            if (!user) {
                throw new BadRequestException('Usuário não encontrado');
            }
            return user;
        } catch (error) {
            console.error(`Erro ao buscar usuário com ID ${id}:`, error);
            throw new InternalServerErrorException('Erro ao buscar usuário');
        }
    }

    async findByEmail(email: string) {
        try {
            return await this.repository.findByEmail(email);
        } catch (error) {
            console.error(`Erro ao buscar usuário com email ${email}:`, error);
            throw new InternalServerErrorException('Erro ao buscar usuário por email');
        }
    }

    async findByCpf(cpf: string) {
        try {
            return await this.repository.findByCpf(cpf);
        } catch (error) {
            console.error(`Erro ao buscar usuário com CPF ${cpf}:`, error);
            throw new InternalServerErrorException('Erro ao buscar usuário por CPF');
        }
    }
}
