import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  ForbiddenException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Role } from 'src/auth/decorators/role.decorator';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import { OrderStatus } from './order.enum';

@Controller('orders')
export class OrdersController {
  constructor(
    private ordersService: OrdersService,
    private userService: UserService,
  ) {}

  @Post()
  async createOne(@Req() req: Request, @Body() data: CreateOrderDto) {
    if (data.customer == req.user._id) {
      try {
        return await this.ordersService.createOrder(data);
      } catch (error) {
        console.error(error);
        throw new BadRequestException();
      }
    }

    throw new ForbiddenException();
  }

  @Get()
  @Role('admin')
  async getAll() {
    try {
      return await this.ordersService.getAllOrders();
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  @Get('/my-orders')
  async getUserOrders(@Req() req: Request) {
    try {
      return await this.ordersService.getUserOrders(String(req.user._id));
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  @Get(':id')
  @Role('admin')
  async getOne(@Param('id') id: string) {
    try {
      return await this.ordersService.getOrderById(id);
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() data: UpdateOrderDto,
  ) {
    if (req.user.role == 'admin') {
      try {
        if (data.status == OrderStatus.COMPLETED) {
          const { products: productIds, customer: customerId } =
            await this.ordersService.getOrderById(id);

          const customer = await this.userService.getUserById(
            String(customerId),
          );

          productIds.forEach((id) => {
            if (!customer.purchases.includes(id)) {
              customer.purchases.push(id);
            }
          });

          await customer.save();
        }

        return await this.ordersService.updateOrderById(id, data);
      } catch (error) {
        console.error(error);
        throw new BadRequestException();
      }
    } else {
      if (data.status != OrderStatus.CANCELED) {
        throw new UnauthorizedException();
      } else {
        try {
          return await this.ordersService.updateOrderById(id, data);
        } catch (error) {
          console.error(error);
          throw new BadRequestException();
        }
      }
    }
  }

  @Delete(':id')
  @Role('admin')
  async deleteOne(@Param('id') id: string) {
    try {
      return await this.ordersService.deleteOrderById(id);
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }
}
