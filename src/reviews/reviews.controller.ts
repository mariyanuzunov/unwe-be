import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  BadRequestException,
  Req,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { UserService } from 'src/user/user.service';
import { Request } from 'express';
import { Role } from 'src/auth/decorators/role.decorator';

@Controller('reviews')
export class ReviewsController {
  constructor(
    private readonly reviewsService: ReviewsService,
    private userService: UserService,
  ) {}

  @Post()
  async createOne(@Req() req: Request, @Body() data: CreateReviewDto) {
    if (req.user._id != data.author) {
      throw new ForbiddenException();
    }

    try {
      const user = await this.userService.getUserById(data.author);
      if (user.purchases.includes(data.product)) {
        return await this.reviewsService.createReview(data);
      }
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  @Get()
  @Role('admin')
  async getAll() {
    try {
      return await this.reviewsService.getAllReviews();
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  @Public()
  @Get('item-reviews/:id')
  async getItemReview(@Param('id') id: string) {
    try {
      return await this.reviewsService.getItemReviews(id);
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  @Get('my-reviews')
  getUserReviews(@Req() req: Request) {
    try {
      console.log(req.user);
      return this.reviewsService.getUserReviews(String(req.user._id));
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string, @Req() req: Request) {
    const review = await this.reviewsService.getReviewById(id);
    if (review.author == req.user._id || req.user.role == 'admin') {
      try {
        return await this.reviewsService.deleteReview(id);
      } catch (error) {
        console.error(error);
        throw new BadRequestException();
      }
    }

    throw new UnauthorizedException();
  }
}
