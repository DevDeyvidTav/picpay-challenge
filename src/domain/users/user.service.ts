import { BadRequestException, Injectable, InternalServerErrorException, Inject } from "@nestjs/common";
import { AbstractUserRepository } from "./user-repository.abstract";
import { CreateUserDto } from "./dtos/create-user.dto";
import { AbstractWalletRepository } from "../wallet/wallet-repository.abstract";

@Injectable()
export class UserService {
    constructor(
        @Inject('UseAbstractUserRepository')
        private readonly repository: AbstractUserRepository,

        @Inject('UseAbstractWalletRepository')
        private readonly walletRepository: AbstractWalletRepository
    ) {}

    async create(user: CreateUserDto) {
        try {
            const [emailExists, cpfExists] = await Promise.all([
                this.repository.findByEmail(user.email),
                this.repository.findByCpf(user.cpf),
            ]);

            if (emailExists) {
                return new BadRequestException('Já existe um usuário com esse email');
            }

            if (cpfExists) {
                return new BadRequestException('Já existe um usuário com esse cpf');
            }

            const newUser = await this.repository.create(user);

            const wallet = await this.walletRepository.create(newUser.id);
            return {
                newUser,
                wallet
            }
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
            return error
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
