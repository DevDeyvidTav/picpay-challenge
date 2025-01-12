import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { isUUID } from 'class-validator';

@Injectable()
export class WalletService {
  constructor(
    @Inject('UseAbstractWalletRepository')
    private readonly walletRepository,
  ) {}

  async getByUserId(userId: string) {
    try {
      if (!userId) {
        return new BadRequestException('Usuário não informado');
      }

      if (!isUUID(userId)) {
        return new BadRequestException('ID do usuário inválido');
      }

      const wallet = await this.walletRepository.findByUserId(userId);
      if (!wallet) {
        return new NotFoundException('Carteira não encontrada');
      }

      return wallet;
    } catch (error) {
      console.error('Erro ao buscar carteira:', error);
      throw new InternalServerErrorException('Erro ao buscar carteira');
    }
  }
}
