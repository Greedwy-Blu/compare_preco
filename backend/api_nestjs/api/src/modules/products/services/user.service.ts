import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-product-body';
import { UsersRepository } from '../repositories/product.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}
  async create(createUserDto: CreateUserDto) {
    const findUser = await this.usersRepository.findByEmail(
      createUserDto.email,
    );
    if (findUser) {
      throw new ConflictException('email already exists');
    }
    const user = await this.usersRepository.create(createUserDto);
    return user;
  }

  async findAll() {
    return this.usersRepository.findAll();
  }

  async findOne(id: number) {
    const findUser = await this.usersRepository.findOne(id);
    if (!findUser) {
      throw new NotFoundException('user not found');
    }
    return this.usersRepository.findOne(id);
  }

  async findByEmail(email: string) {
    const findUser = await this.usersRepository.findByEmail(email);
    return findUser;
  }

  async remove(id: number) {
    const findUser = await this.usersRepository.findOne(id);
    if (!findUser) {
      throw new NotFoundException('user not found');
    }
    return this.usersRepository.delete(id);
  }
}
