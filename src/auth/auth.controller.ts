import { UsersService } from "src/users/users.service";
import { AuthService } from "./auth.service";
import { LocalGuard } from "src/guards/local.guard";
import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "src/users/dto/create-user.dto";

@Controller()
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  @UseGuards(LocalGuard)
  @Post('signin')
  async signin(@Req() req) {
    return this.authService.auth(req.user)
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return this.authService.auth(user);
  }
}