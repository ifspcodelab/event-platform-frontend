export interface LoginDto {
  email: string,
  password: string
}

export class LoginCreateDto {
  email: string;
  password: string;
  recaptcha: string;

  constructor(
    email: string,
    password: string,
    recaptcha: string
  ) {
    this.email = email;
    this.password = password;
    this.recaptcha = recaptcha;
  }
}
