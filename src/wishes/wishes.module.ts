import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Wish } from "./wishes.entity";
import { WishesController } from "./wishes.controller";
import { WishesService } from "./wishes.service";
import { AuthModule } from "src/auth/auth.module";


@Module({
  imports: [TypeOrmModule.forFeature([Wish]),
  AuthModule],
  controllers: [WishesController],
  providers: [WishesService],
  exports: [WishesService]
})
export class WishesModule {}