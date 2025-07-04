import { ConflictException, Inject } from '@nestjs/common'
import { UserEntity } from '../entities/user.entity'
import { UsersRepository } from '../repositories/users-repository'
import { FirebaseAuthService } from 'src/config/firebase/firebase-auth.service'

interface CreateUserUseCaseRequest {
  name: string
  email: string
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
  ) {}

  async execute({
    name,
    email,
    phone,
    role,
    password,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const existingUser = await this.usersRepository.findByEmail(email)

    if (existingUser) {
      throw new ConflictException('E-mail já cadastrado.')
    }

    // Cria no Auth do Firebase
    let firebaseUser
    try {
      firebaseUser = await this.firebaseAuthService.createUser({ email, password })
    } catch (error) {
      if (error.code) {
        throw new ConflictException(error)
      }
      throw error // re-lança outros erros
    }

    // Salva no repositório, usando o uid do Auth
    const user = await this.usersRepository.create({
      uid: firebaseUser.uid,
      name,
      email,
      phone,
      role,
    })

    return { user }
  }
}
