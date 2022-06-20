import { IsNotEmpty, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateReviewDto {
  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: 'Author field is required!' })
  author: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: 'Product field is required!' })
  product: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: 'Content field is required!' })
  @MaxLength(500, {
    message: 'The content should not exceed 500 characters!',
  })
  content: string;
}
