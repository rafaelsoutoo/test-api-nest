import { ConflictException, Inject } from '@nestjs/common'
import { UserEntity } from '../entities/user.entity'
import { UsersRepository } from '../repositories/users-repository'
import { FirebaseAuthService } from 'src/config/firebase/firebase-auth.service'

interface CreateUserUseCaseRequest {
  name: string
  email: string
  cpf: string
  phone: string
  role: 'admin' | 'superAdmin'
  password: string
}

interface CreateUserUseCaseResponse {
  user: UserEntity
}

export class CreateUserUseCase {
  constructor(
    @Inject(UsersRepository)
    private usersRepository: UsersRepository,
    private firebaseAuthService: FirebaseAuthService,
  ) { }

  async execute({
    name,
    email,
    phone,
    cpf,
    role,
    password,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const existingEmailUser = await this.usersRepository.findByEmail(email)
    const existingCpfUser = await this.usersRepository.findByCPF(cpf)


    if (existingEmailUser) {
      throw new ConflictException('email already existing')
    }
    if (existingCpfUser) {
      throw new ConflictException('cpf already existing')
    }

    let firebaseUser
    try {
      firebaseUser = await this.firebaseAuthService.createUser({ email, password })
    } catch (error) {
      if (error.code) {
        throw new ConflictException(error)
      }
      throw error
    }

    const user = await this.usersRepository.create({
      id: firebaseUser.uid,
      name,
      email,
      cpf,
      phone,
      role,
    })

    return { user }
  }
}
