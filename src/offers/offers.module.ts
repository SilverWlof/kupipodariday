import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Offer } from "./offers.entity";
import { OffersController } from "./offers.controller";
import { OffersService } from "./offers.service";
import { AuthModule } from "src/auth/auth.module";
import { WishesModule } from "src/wishes/wishes.module";


@Module({
  imports: [TypeOrmModule.forFeature([Offer]), AuthModule, WishesModule],
  controllers: [OffersController],
  providers: [OffersService]
})
export class OffersModule {}