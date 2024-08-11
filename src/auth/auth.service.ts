import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/users/users.entity";
import { UsersService } from "src/users/users.service";
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
  ) {}

  async auth(user: User) {
    const payload = {sub: user.id};

    return {access_token: await this.jwtService.sign(payload)}
  }

  async validatePassword(username: string, password: string) {
    const user = await this.usersService.findOneByUsername(username);

    const isEqual = await bcrypt.compare(password, user.password)
    if (user && (isEqual === true)) {
      const {password, email, ...result} = user;

      
      return result;
    }

    return null;
  }
}