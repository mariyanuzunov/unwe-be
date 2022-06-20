import { IsIn, IsNotEmpty, IsUrl, Min } from 'class-validator';
import { Transform } from 'class-transformer';
export class CreateDoorDto {
  @Transform(({ value }) => value.trim())
  @IsIn(['интериорна врата', 'входна врата'], { message: 'Invalid category!' })
  category: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: 'Title is required!' })
  title: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: 'Manufacturer is required!' })
  manufacturer: string;

  @Transform(({ value }) => value.trim())
  @IsNotEmpty({ message: 'Description is required!' })
  description: string;

  // @Transform(({ value }) => value.trim())
  @Min(1, { message: 'The price must be a positive number!' })
  price: number;

  @Transform(({ value }) => value.trim())
  @IsUrl({}, { message: 'Invalid image URL address!' })
  imgUrl: string;
}
