import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { AbstractUserRepository } from './user-repository.abstract';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('UseAbstractUserRepository') // Certifique-se de usar o mesmo token
    private readonly repository: AbstractUserRepository,
  ) {}

  async create(user: CreateUserDto) {
    try {
      const alreadyExistsThisEmail = await this.repository.findByEmail(
        user.email,
      );
      const alreadyExistsThisCpf = await this.repository.findByCpf(user.cpf);

      if (alreadyExistsThisEmail) {
        throw new BadRequestException('Já existe um usuário com esse email');
      }

      if (alreadyExistsThisCpf) {
        throw new BadRequestException('Já existe um usuário com esse cpf');
      }

      return await this.repository.create(user);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Algo deu errado!');
    }
  }

  async findAll() {
    try {
      return await this.repository.findAll();
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string) {
    try {
      return await this.repository.findById(id);
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email: string) {
    try {
      return await this.repository.findByEmail(email);
    } catch (error) {
      throw error;
    }
  }

  async findByCpf(cpf: string) {
    try {
      return await this.repository.findByCpf(cpf);
    } catch (error) {
      throw error;
    }
  }
}
