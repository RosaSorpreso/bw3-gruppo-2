export interface iUser {
  id: number,
  firstName: string,
  lastName: string
  email: string,
  password?: string,
  admin?: boolean
}
