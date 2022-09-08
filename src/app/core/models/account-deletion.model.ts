export class AccountDeletionModel {
  constructor(
    private password: string,
    private userRecaptcha: string
  ) { }
}
