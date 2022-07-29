
export class ForgotPasswordCreateDto {

  constructor (private email: string, private userCaptcha: string){};
}

