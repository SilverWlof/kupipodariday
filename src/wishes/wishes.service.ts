import { BadGatewayException, BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Wish } from "./wishes.entity";
import { FindManyOptions, Repository } from "typeorm";
import { updateWishDto } from "./dto/update-wish.dto";
import { createWishDto } from "./dto/create-wish.dto";
import { User } from "src/users/users.entity";


@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
  ) {}

  async find(options: FindManyOptions<Wish>) {
    return this.wishRepository.find(options);
  }

  async create(createWishDto: createWishDto, user: User) {
    return this.wishRepository.save({...createWishDto, owner: user});
  }

  async findOne(id: number) {
    const wish = await this.wishRepository.findOneBy({id})
    if (!wish) {
      throw new NotFoundException();
    }

    return wish;
  }

  async updateOne(id: number, updateWishDto: updateWishDto, user: User) {
    const wish = await this.wishRepository.findOneBy({id});
    if (!wish) {
      throw new NotFoundException()
    }

    if (wish.offers.length > 0) {
      throw new BadRequestException('Нельзя изменить, так как уже существуют пользователи готовые скинуться')
    }

    if (wish.owner.id !== user.id) {
      throw new BadRequestException('Вы не являетесь владельцем данного желания')
    }

    return this.wishRepository.update({id}, updateWishDto);
  }

  async removeOne(id: number, user: User) {
    const wish = await this.wishRepository.findOneBy({id});
    if (!wish) {
      throw new NotFoundException()
    }

    if (wish.owner.id !== user.id) {
      throw new BadGatewayException('Удаление не возможно так как желание не было создано вами');
    }

    return this.wishRepository.delete({id});
  }

  async copyOne(id: number, user: User) {
    const wish = await this.wishRepository.findOneBy({id});
    if (!wish) {
      throw new NotFoundException();
    }

    if (user.wishes.find((wiish) => wiish.owner.id === wish.owner.id)) {
      throw new BadRequestException('Повторная поптыка копирования');
    }
    const newWish = await this.create({
      name: wish.name, 
      link: wish.link, 
      image: wish.image, 
      price: wish.price, 
      description: wish.description}, 
      user);

    await this.wishRepository.update({id}, {copied: wish.copied + 1});
    return newWish
  }

  async riseAmount(id: number, amount: number) {
    return this.wishRepository.update({id}, {rised: amount});
  }
}