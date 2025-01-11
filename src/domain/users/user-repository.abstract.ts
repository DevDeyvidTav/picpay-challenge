import { CreateUserDto } from "./dtos/create-user.dto";
import { User } from "./user.entity";

export abstract class AbstractUserRepository {
    abstract create(user: CreateUserDto): Promise<User>;
    abstract findByEmail(email: string): Promise<User>;
    abstract findById(id: string): Promise<User>;
    abstract findAll(): Promise<User[]>
    abstract findByCpf(cpf: string): Promise<User>
}