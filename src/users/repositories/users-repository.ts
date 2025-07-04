import { UserEntity } from "../entities/user.entity";

export abstract class UsersRepository {
  abstract findByEmail(email: string): Promise<UserEntity | null>
  abstract create(data: {
    uid: string
    name: string
    email: string
    phone?: string
    role?: 'admin' | 'superAdmin'
  }): Promise<UserEntity>
}
