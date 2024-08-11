import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wish } from './wishes/wishes.entity';
import { Wishlist } from './wishlists/wishlists.entity';
import { User } from './users/users.entity';
import { Offer } from './offers/offers.entity';
import { WishlistsModule } from './wishlists/wishlists.module';
import { WishesModule } from './wishes/wishes.module';
import { UsersModule } from './users/users.module';
import { OffersModule } from './offers/offers.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'student',
    password: 'student',
    database: 'kupipodariday',
    entities: [Wish, Wishlist, User, Offer],
    synchronize: true
  }),
  WishlistsModule,
  WishesModule,
  UsersModule,
  OffersModule,
  AuthModule
],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
