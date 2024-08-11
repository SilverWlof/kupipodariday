import { Body, Controller, Post, Get, Param, Patch, Delete, UseGuards, Req } from "@nestjs/common";
import { WishesService } from "./wishes.service";
import { createWishDto } from "./dto/create-wish.dto";
import { updateWishDto } from "./dto/update-wish.dto";
import { JwtGuard } from "src/guards/jwt.guard";


@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @UseGuards(JwtGuard)
  @Post('')
  async create(@Body() createWishDto: createWishDto, @Req() req) {
    return this.wishesService.create(createWishDto, req.user);
  }

  @Get('last')
  async getLastWish() {
    return await this.wishesService.find({
      relations: ['owner', 'offers'],
      order: {createdAt: 'DESC'},
      take: 40
    });
  }

  @Get('top')
  async getTopWish() {
    return await this.wishesService.find({
      relations: ['owner', 'offers'],
      order: {copied: 'DESC'},
      take: 20
    });
  }

  @UseGuards(JwtGuard)
  @Get(':wishId')
  async findOne(@Param('wishId') wishId: number) {
    return this.wishesService.findOne(wishId);
  }

  @UseGuards(JwtGuard)
  @Patch(':wishId')
  async updateOne(@Param('wishId') wishId: number, @Body() updateWishDto: updateWishDto, @Req() req) {
    return this.wishesService.updateOne(wishId, updateWishDto, req.user);
  }

  @UseGuards(JwtGuard)
  @Delete(':wishId')
  async removeOne(@Param('wishId') wishId: number, @Req() req) {
    return this.wishesService.removeOne(wishId, req.user);
  }

  @UseGuards(JwtGuard)
  @Post(':wishId/copy')
  async copyOne(@Param('wishId') wishId: number, @Req() req) {
    return this.wishesService.copyOne(wishId, req.user);
  }
}