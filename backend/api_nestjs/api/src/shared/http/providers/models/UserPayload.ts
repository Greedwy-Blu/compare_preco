export interface UserPayload {
  sub: string | number;
  email: string;
  iat?: number;
  exp?: number;
}
