import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export abstract class CreateNotificationDto {
    @IsUUID()
    @IsNotEmpty()
    userId: string;
    @IsString()
    @IsNotEmpty()
    message: string;
}