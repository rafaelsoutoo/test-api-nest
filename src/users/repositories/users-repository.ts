import { UserEntity } from "../entities/user.entity";

export abstract class UsersRepository {
  abstract findByEmail(email: string): Promise<UserEntity | null>
  abstract findByCPF(cpf: string): Promise<UserEntity | null>
  abstract create(data: UserEntity ): Promise<UserEntity>
}
