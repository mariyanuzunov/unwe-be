import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review, ReviewDocument } from './schemas/review.schema';

const authorFields = {
  _id: 1,
  firstName: 1,
  lastName: 1,
};

const productFields = {
  _id: 1,
  title: 1,
  imgUrl: 1,
};

enum ReviewFields {
  AUTHOR = 'author',
  PRODUCT = 'product',
}

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {}

  async createReview(createReviewDto: CreateReviewDto) {
    const review = new this.reviewModel(createReviewDto);
    return (await review.save()).populate('author').execPopulate();
  }

  getAllReviews() {
    return this.reviewModel
      .find()
      .populate(ReviewFields.AUTHOR, authorFields)
      .populate(ReviewFields.PRODUCT, productFields)
      .sort({ CreatedAt: -1 })
      .exec();
  }

  getUserReviews(userId: string) {
    return this.reviewModel
      .find({ author: userId })
      .populate(ReviewFields.AUTHOR, authorFields)
      .populate(ReviewFields.PRODUCT, productFields)
      .sort({ CreatedAt: -1 })
      .exec();
  }

  getItemReviews(itemId: string) {
    return this.reviewModel
      .find({ product: itemId })
      .populate(ReviewFields.AUTHOR, authorFields)
      .sort({ createdAt: -1 })
      .exec();
  }

  getReviewById(id: string) {
    return this.reviewModel.findById(id).exec();
  }

  deleteReview(id: string) {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }
}
