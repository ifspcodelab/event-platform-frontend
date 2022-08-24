export class AlterMyDataPasswordDto {
  constructor(private currentPassword: string, private newPassword: string, private userRecaptcha: string) { }
}
