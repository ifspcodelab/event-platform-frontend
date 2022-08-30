import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PasswordResetService } from "../../../core/services/password-reset.service";
import { ForgotPasswordCreateDto } from "../../../core/models/forgot-password-create-dto.model";
import { Router } from "@angular/router";
import { environment } from "../../../../environments/environment";
import { NotificationService } from "../../../core/services/notification.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  submitted: boolean = false;
  userRecaptcha: string | undefined;
  form: FormGroup;
  recaptchaSiteKey: string = environment.recaptchaSiteKey;
  requestLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private passwordResetService: PasswordResetService,
    private renderer: Renderer2,
    private router: Router,
    private notificationService: NotificationService,
  ) {
    this.form = this.buildForm();
    this.userRecaptcha = '';
  }

  ngOnInit(): void { }

  onSubmit() {
    this.submitted = true;

    localStorage.setItem('email', this.form.value['email']);

    if(this.form.invalid || this.userRecaptcha == ''){
      return;
    }

    const forgotPasswordRequest = new ForgotPasswordCreateDto(this.form.value['email'], this.userRecaptcha!);

    this.requestLoading = true;

    this.passwordResetService.sendResetPasswordRequest(forgotPasswordRequest)
      .subscribe({
        next: ()=> {
          this.notificationService.success("Um link será enviado ao e-mail informado. Verifique sua caixa de entrada");
          this.form.reset();
          this.submitted = false;
          return this.router.navigate(['esqueci-minha-senha','reenviar-email']);
        },
        error: () => {
          this.notificationService.error("Algo de errado com o recaptcha. Tente novamente");
          this.form.reset();
          this.submitted = false;
          this.requestLoading = false;
          this.refreshRecaptcha();
        }
      });
  }

  emailErrors() {
    return this.form.get('email')?.errors;
  }

  resolved(captchaResponse: string): void {
    this.userRecaptcha = captchaResponse;
  }

  buildForm(): FormGroup{
    return this.formBuilder.group({
      email: ["",
        [Validators.required,
          Validators.email,
          Validators.maxLength(349)]]
    });
  }

  refreshRecaptcha(): void {
    grecaptcha.reset();
  }
}
