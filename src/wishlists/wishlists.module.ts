import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Wishlist } from "./wishlists.entity";
import { WishlistsController } from "./wishlists.controller";
import { WishlistsService } from "./wishlists.service";
import { AuthModule } from "src/auth/auth.module";
import { WishesModule } from "src/wishes/wishes.module";


@Module({
  imports: [TypeOrmModule.forFeature([Wishlist]), AuthModule, WishesModule],
  controllers: [WishlistsController],
  providers: [WishlistsService]
})
export class WishlistsModule {}