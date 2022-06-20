import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderField } from './order.enum';
import { Order, OrderDocument } from './schemas/order.schema';

const customerFeilds = {
  _id: 1,
  firstName: 1,
  lastName: 1,
  email: 1,
  phone: 1,
};

const productFields = {
  _id: 1,
  title: 1,
  price: 1,
  imgUrl: 1,
};

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    const order = new this.orderModel(createOrderDto);
    return order.save();
  }

  async getAllOrders() {
    return this.orderModel
      .find()
      .sort({ createdAt: -1 })
      .populate(OrderField.CUSTOMER, customerFeilds)
      .populate(OrderField.PRODUCTS, productFields)
      .exec();
  }

  async getUserOrders(userId: string) {
    return this.orderModel
      .find({ customer: userId })
      .sort({ createdAt: -1 })
      .populate(OrderField.CUSTOMER, customerFeilds)
      .populate(OrderField.PRODUCTS, productFields)
      .exec();
  }

  async getOrderById(id: string) {
    return this.orderModel.findById(id).exec();
  }

  async updateOrderById(id: string, updateOrderDto: UpdateOrderDto) {
    return this.orderModel
      .findByIdAndUpdate(id, updateOrderDto, {
        useFindAndModify: false,
        returnOriginal: false,
      })
      .exec();
  }

  async deleteOrderById(id: string) {
    return this.orderModel.findByIdAndDelete(id).exec();
  }
}
