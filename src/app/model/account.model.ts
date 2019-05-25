export class Account {
  id: number;
  login: string;
  email: string;
  password: string;
  authorities: object;
  token?: string;
}
