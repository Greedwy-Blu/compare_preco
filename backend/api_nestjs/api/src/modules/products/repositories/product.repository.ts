import { CreateUserDto } from '../dtos/create-product-body';
import { User } from '../entities/product.entity';

export abstract class UsersRepository {
  abstract create(data: CreateUserDto): Promise<User> | User;
  abstract findAll(): Promise<User[]> | User[];
  abstract findOne(id: number): Promise<User | undefined> | User;
  abstract delete(id: number): Promise<void> | void;
  abstract findByEmail(email: string): Promise<User | undefined> | User;
}
