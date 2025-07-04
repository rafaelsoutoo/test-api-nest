import { Injectable } from '@nestjs/common'
import { UsersRepository } from '../users-repository'
import { PrismaService } from 'src/database/prisma/prisma.service'
import { UserEntity } from 'src/users/entities/user.entity'

@Injectable()
export class PrismaUserRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { email } })
    if (!user) return null
    return {
      ...user,
      phone: user.phone ?? undefined,
    }
  }

  async create(data: any): Promise<UserEntity> {
    const user = await this.prisma.user.create({ data: {
      id: data.uid,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
    } })
    return {
      ...user,
      phone: user.phone ?? undefined,
    }
  }
}
