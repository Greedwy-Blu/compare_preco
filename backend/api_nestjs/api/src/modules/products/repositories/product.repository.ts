import { CreateProductDto } from '../dtos/create-product-body';
import { PrecoProdutos } from '../entities/product.entity';

export abstract class ProductsRepository {
  abstract create(
    data: CreateProductDto,
  ): Promise<PrecoProdutos> | PrecoProdutos;
  abstract findAll(): Promise<PrecoProdutos[]> | PrecoProdutos[];
  abstract findOne(
    id: number,
  ): Promise<PrecoProdutos | undefined> | PrecoProdutos;
  abstract delete(id: number): Promise<void> | void;
  abstract findByProduct(
    nomeProduto: string,
  ): Promise<PrecoProdutos | undefined> | PrecoProdutos;
}
