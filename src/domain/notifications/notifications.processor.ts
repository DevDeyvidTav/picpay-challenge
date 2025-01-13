import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { Logger, Inject } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Processor('notifications')
export class NotificationsProcessor {
  private readonly logger = new Logger(NotificationsProcessor.name);

  constructor(private readonly notificationsService: NotificationsService) {}

  @Process('send')
  async handleNotification(job: Job<{ message: string; userId: string }>) {
    const { message, userId } = job.data;

    try {
      this.logger.log(`Enviando notificação para o usuário ${userId}: ${message}`);

      const response = await fetch('https://util.devi.tools/api/v1/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });


      if (!response.ok) {
        throw new Error(`Falha ao enviar notificação. Status: ${response.status}`);
      }

      this.logger.log(`Notificação enviada com sucesso para o usuário ${userId}`);

    
      await this.notificationsService.saveNotification({ message, userId });

    } catch (error) {
      this.logger.error(`Erro ao enviar notificação: ${error.message}`);
      throw error; 
    }
  }
}
