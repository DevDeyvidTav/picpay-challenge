import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateTransferDto {
  @IsUUID()
  @IsNotEmpty()
  sender: string;
  @IsUUID()
  @IsNotEmpty()
  receiver: string;
  @IsNotEmpty()
  @IsNumber()
  value: number;
}
