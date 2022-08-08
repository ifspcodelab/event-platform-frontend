
export class ForgotPasswordCreateDto {

  constructor (private email: string, private userRecaptcha: string){};
}

