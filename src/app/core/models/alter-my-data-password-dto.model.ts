export class MyDataAlterPasswordDto {
  constructor(private currentPassword: string, private newPassword: string, private userRecaptcha: string) { }
}
