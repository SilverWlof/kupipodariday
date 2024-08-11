import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Offer } from "./offers.entity";
import { Repository } from "typeorm";
import { createOfferDto } from "./dto/create-offer.dto";
import { updateOfferDto } from "./dto/update-offer.dto";
import { WishesService } from "src/wishes/wishes.service";
import { User } from "src/users/users.entity";


@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    private wishesService: WishesService
  ) {}

  async find() {
    return this.offerRepository.find();
  }

  async create(createOfferDto: createOfferDto, user: User) {
    const wish = await this.wishesService.findOne(createOfferDto.itemId);
    if (
      createOfferDto.amount > wish.price || 
      createOfferDto.amount > wish.price - wish.rised || 
      wish.price === wish.rised) {
        throw new BadRequestException('Сумма слишком большая');
      }
    
    await this.wishesService.riseAmount(wish.id, wish.rised + createOfferDto.amount)
    return await this.offerRepository.save({...createOfferDto, item: wish, user: user});
  }

  async findOne(id: number) {
    const offer = await this.offerRepository.findOneBy({id});
    if (!offer) {
      return new NotFoundException()
    }
    
    return offer;
  }

  async updateOne(id: number, updateOfferDto: updateOfferDto, user: User) {
    const offer = await this.offerRepository.findOneBy({id});
    if (!offer) {
      throw new NotFoundException()
    }

    if (offer.user.id !== user.id) {
      throw new BadRequestException('Нельзя обновить оффер чужого пользователя');
    }

    return this.offerRepository.update({id}, updateOfferDto);
  }

  async removeOne(id: number, userId: number) {
    const offer = await this.offerRepository.findOneBy({id});
    if (offer.user.id !== userId) {
      return new BadRequestException('Нельзя удалять чужие предложения скинуться');
    }

    return this.offerRepository.delete({id});
  }
}