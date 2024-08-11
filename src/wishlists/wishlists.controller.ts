import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, Req } from "@nestjs/common";
import { WishlistsService } from "./wishlists.service";
import { CreateWishlistDto } from "./dto/create-wishlist.dto";
import { UpdateWishlistDto } from "./dto/update-wishlist.dto";
import { JwtGuard } from "src/guards/jwt.guard";

@Controller('wishlists')
export class WishlistsController {
  constructor(private readonly wishlistService: WishlistsService) {}

  @UseGuards(JwtGuard)
  @Get('')
  async findAll() {
    return this.wishlistService.findAll();
  }

  @UseGuards(JwtGuard)
  @Post('')
  async create(@Body() createWishlistDto: CreateWishlistDto, @Req() req) {
    return this.wishlistService.create(createWishlistDto, req.user);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.wishlistService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async removeOne(@Param('id') id: number, @Req() req) {
    return this.wishlistService.removeOne(id, req.user);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async updateOne(@Param('id') id: number, @Body() updateWishlistDto: UpdateWishlistDto, @Req() req) {
    return this.wishlistService.updateOne(id, updateWishlistDto, req.user);
  }
}