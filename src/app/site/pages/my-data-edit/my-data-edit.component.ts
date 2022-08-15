import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppValidators } from "../../../core/validators/app-validator";
import { AccountDto, AccountTokenDto } from "../../../core/models/account.model";
import { first } from "rxjs";
import { MyDataService } from "../../../core/services/my-data.service";
import { NotificationService } from "../../../core/services/notification.service";
import { Router } from "@angular/router";
import { JwtService } from "../../../core/services/jwtservice.service";
import { AccessTokenData } from "../../../core/models/access-token-data.model";

@Component({
  selector: 'app-my-data-edit',
  templateUrl: './my-data-edit.component.html',
  styleUrls: ['./my-data-edit.component.scss']
})
export class MyDataEditComponent implements OnInit {
  form: FormGroup = this.buildForm();
  userReCaptcha: string | undefined = '';
  accessToken: string = this.jwtService.getAccessToken();
  // accessTokenData: AccessTokenData = this.jwtService.decodeAccessToken(this.accessToken);

  constructor(
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private myDataService: MyDataService,
    private notificationService: NotificationService,
    private router: Router,
    private jwtService: JwtService,
  ) { }

  ngOnInit(): void {
    let script = this.renderer.createElement('script');
    script.defer = true;
    script.async = true;
    script.src = "https://www.google.com/recaptcha/api.js\n";
    this.renderer.appendChild(document.body, script);
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(256),
          AppValidators.validName()
        ],
      ],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(350)]],
      cpf: ['', [Validators.required, AppValidators.validCpf()]],
    });
  }

  field(path: string) {
    return this.form.get(path)!;
  }

  fieldErrors(path: string) {
    return this.field(path)?.errors;
  }

  onSubmit(): void {
    if (this.form.invalid || this.userReCaptcha == '') {
      return;
    }
    // this.updateAccount();
  }

  // private updateAccount() {
  //   const accountTokenDto =
  //     new AccountTokenDto(
  //       this.form.value['name'],
  //       this.form.value['email'],
  //       this.form.value['cpf'],
  //       // this.accessTokenData.agreed,
  //       this.userReCaptcha,
  //     );
  //   this.myDataService.patchAccount(accountTokenDto)
  //     .pipe(first())
  //     .subscribe({
  //       next: () => {
  //         this.notificationService.success("Dados editados com sucesso");
  //         this.router.navigate(['meus-dados']);
  //       },
  //       // error: error => this.handleError(error)
  //     });
  // }



  resolved(captchaResponse: string): void {
    this.userReCaptcha = captchaResponse;
  }
}
