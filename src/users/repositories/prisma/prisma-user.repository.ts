import { Injectable } from '@nestjs/common'
import { UsersRepository } from '../users-repository'
import { PrismaService } from 'src/config/prisma/prisma.service'
import { UserEntity } from 'src/users/entities/user.entity'

@Injectable()
export class PrismaUserRepository implements UsersRepository {
  constructor(private prisma: PrismaService) { }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { email } })
    if (!user) return null
    return user
  }

  async findByCPF(cpf: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { cpf } })
    if (!user) return null
    return user
  }

  async create(data: UserEntity): Promise<UserEntity> {
    const user = await this.prisma.user.create({
      data: {
        id: data.id!,
        name: data.name,
        email: data.email,
        cpf: data.cpf,
        phone: data.phone,
        role: data.role,
      }
    })
    return user
  }
}
