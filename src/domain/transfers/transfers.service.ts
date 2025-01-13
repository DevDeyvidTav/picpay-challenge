import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateTransferDto } from './dtos/create-transfer.dto';
import { DataSource, EntityManager } from 'typeorm';
import { NotificationsService } from '../notifications/notifications.service';

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
        throw new BadRequestException(
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
      throw new InternalServerErrorException('Erro ao criar transferência');
    } finally {
      await queryRunner.release();
    }
  }
}
