import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateTransferDto } from './dtos/create-transfer.dto';
import { DataSource, EntityManager } from 'typeorm';
import { NotificationsService } from '../notifications/notifications.service';
import axios from 'axios';

@Injectable()
export class TransfersService {
  constructor(
    @Inject('UseAbstractTransfersRepository')
    private readonly transfersRepository,
    @Inject('UseAbstractWalletRepository')
    private readonly walletRepository,
    @Inject('UseAbstractUserRepository')
    private readonly userRepository,
    @Inject('UsePermissionsRepository')
    private readonly permissionsRepository,
    private readonly dataSource: DataSource,
    private readonly notificationsService: NotificationsService,
  ) {}

  async create(data: CreateTransferDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    if (data.sender === data.receiver) {
      throw new BadRequestException(
        'Não é possível realizar uma transferência para o mesmo usuário',
      );
    }

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const senderPermission = await this.permissionsRepository.findByUserId(
        data.sender,
        queryRunner.manager,
      );

      if (!senderPermission || !senderPermission.canSend) {
        return new BadRequestException(
          'Usuário sem permissão para enviar transferência',
        );
      }

      const senderHasBalance =
        await this.walletRepository.verifyIfIsPossibleTransfer(
          data.sender,
          data.value,
          queryRunner.manager,
        );

      if (!senderHasBalance) {
        throw new BadRequestException('Usuário sem saldo suficiente');
      }

      const authResponse = await fetch(
        'https://util.devi.tools/api/v2/authorize',
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        },
      );

      if (authResponse.status !== 200) {
        throw new ForbiddenException('Transferência não autorizada');
      }

      await this.walletRepository.debitBalance(
        data.sender,
        data.value,
        queryRunner.manager,
      );
      await this.walletRepository.creditBalance(
        data.receiver,
        data.value,
        queryRunner.manager,
      );

      const transfer = await this.transfersRepository.create(
        data,
        queryRunner.manager,
      );

      const sender = await this.userRepository.findById(
        data.sender,
        queryRunner.manager,
      );

      await this.notificationsService.createAndEnqueue({
        message: `Transferência de ${data.value} reais recebida de ${sender.fullName}`,
        userId: data.receiver,
      });

      await queryRunner.commitTransaction();
      return transfer;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Erro ao criar transferência:', error);
      throw error
    } finally {
      await queryRunner.release();
    }
  }
}
