import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { User } from "../users/user.entity";

@Entity({ name: "permissions" })
export class Permissions {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: "name", type: "varchar" })
  name: string;

  @Column({ name: "canSend", type: "boolean" })
  canSend: boolean;

  @OneToOne(() => User, (user) => user.permission)
  user: User;
}
