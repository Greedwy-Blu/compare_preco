import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from '../dtos/create-product-body';
import { ProductsRepository } from '../repositories/product.repository';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}
  async create(createProductDto: CreateProductDto) {
    const findUser = await this.productsRepository.findByProduct(
      createProductDto.nomeProduto,
    );
    if (findUser) {
      throw new ConflictException('email already exists');
    }
    const product = await this.productsRepository.create(createProductDto);
    return product;
  }

  async findAll() {
    return this.productsRepository.findAll();
  }

  async findOne(id: number) {
    const findProduct = await this.productsRepository.findOne(id);
    if (!findProduct) {
      throw new NotFoundException('user not found');
    }
    return this.productsRepository.findOne(id);
  }

  async findByProduct(email: string) {
    const findProduct = await this.productsRepository.findByProduct(email);
    return findProduct;
  }

  async remove(id: number) {
    const findUser = await this.productsRepository.findOne(id);
    if (!findUser) {
      throw new NotFoundException('user not found');
    }
    return this.productsRepository.delete(id);
  }
}
