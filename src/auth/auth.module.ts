import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { AuthService } from "./auth.service";
import { JWTStrategy } from "./jwt.strategy";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { LocalStrategy } from "./local.strategy";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./auth.controller";
import configuration from "src/utils/configuration";


@Module({
  imports: [UsersModule, PassportModule, JwtModule.registerAsync({
    imports: [ConfigModule.forRoot({
      load: [configuration]
    })],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('jwt_secret'),
      signOptions: {expiresIn: '1800s'}
    }),
    inject: [ConfigService]
  })],
  providers: [AuthService, ConfigService, JWTStrategy, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}