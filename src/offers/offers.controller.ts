import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { OffersService } from "./offers.service";
import { createOfferDto } from "./dto/create-offer.dto";
import { JwtGuard } from "src/guards/jwt.guard";


@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @UseGuards(JwtGuard)
  @Get('')
  async find() {
    return this.offersService.find();
  }

  @UseGuards(JwtGuard)
  @Post('')
  async create(@Body() createOfferDto: createOfferDto, @Req() req) {
    return this.offersService.create(createOfferDto, req.user);
  }

  @UseGuards(JwtGuard)
  @Get(':offerId')
  async findOne(@Param('offerId') offerId: number) {
    return this.offersService.findOne(offerId);
  }
}