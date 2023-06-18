import { token as _token } from './shared/http/token/entity/token.entity';
import { User as _User } from './modules/user/entities/user.eninty';
import { PrecoProdutos as _PrecoProdutos } from './modules/products/entities/products.enitiys';

export namespace PrismaModel {
  export class token extends _token {}
  export class User extends _User {}
  export class PrecoProdutos extends _PrecoProdutos {}

  export const extraModels = [token, User, PrecoProdutos];
}