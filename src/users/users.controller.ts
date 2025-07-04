import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { CreateUserUseCase } from './use-cases/create-user.use-case'
import { CreateUserDto } from './dtos/register-user.dto'

@Controller('users')
export class UsersController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() body: CreateUserDto): Promise<any> {
    const user = await this.createUserUseCase.execute(body)
    return { user }
  }
}
