export class PasswordResetDto{

  constructor(private password: string, private token: string, private userRecaptcha: string) {
  }
}
