import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Wishlist } from "./wishlists.entity";
import { In, Repository } from "typeorm";
import { CreateWishlistDto } from "./dto/create-wishlist.dto";
import { WishesService } from "src/wishes/wishes.service";
import { UpdateWishlistDto } from "./dto/update-wishlist.dto";
import { User } from "src/users/users.entity";


@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
    private wishesServise: WishesService
  ) {}

  async create(createWishlistDto: CreateWishlistDto, user: User) {
    const wishes = await this.wishesServise.find({where: {id: In(createWishlistDto.items)}});
    return this.wishlistRepository.save({...createWishlistDto, items: wishes, owner: user});
  }

  async findAll() {
    return this.wishlistRepository.find()
  }

  async findOne(wishlistId: number) {
    const wishlist = await this.wishlistRepository.findOneBy({id: wishlistId})
    if (wishlist.id !== wishlistId) {
      throw new NotFoundException()
    }

    return wishlist;
  }

  async updateOne(wishlistId: number, updateWishlistDto: UpdateWishlistDto, user: User) {
    const wishlist = await this.wishlistRepository.findOneBy({id: wishlistId})
    if (wishlist.id !== wishlistId) {
      throw new NotFoundException()
    }

    if (user.id !== wishlist.owner.id) {
      throw new BadRequestException('Вы не являетесь пользователем, создавшим этот список желаний');
    }

    if (updateWishlistDto.items) {
      const newWishes = await this.wishesServise.find({where: {id: In(updateWishlistDto.items)}})
      wishlist.items.push(...newWishes);
    }
    
    return await this.wishlistRepository.update({id: wishlistId}, {...updateWishlistDto, items: wishlist.items})
  }

  async removeOne(wishlistId: number, user: User) {
    const wishlist = await this.wishlistRepository.findOneBy({id: wishlistId})
    if (wishlist.owner.id !== user.id) {
      throw new BadRequestException('Нельзя удалять чужие списки желаний');
    }
    return this.wishlistRepository.delete(wishlistId);
  }
}