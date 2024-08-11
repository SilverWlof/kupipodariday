

export class CreateUserDto {
  username: string;
  email: string;
  password: string;
  about?: string;
  avatar?: string;
}