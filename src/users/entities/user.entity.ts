export interface UserEntity {
  id?: string
  name: string
  email: string
  cpf: string
  phone: string
  role: 'admin' | 'superAdmin'
  createdAt?: Date
}
