import {Component, OnInit, Renderer2} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PasswordResetService } from "../../../core/services/password-reset.service";
import {ForgotPasswordCreateDto} from "../../../core/models/forgot-password-create-dto.model";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  submitted: boolean = false;
  userRecaptcha: string | undefined;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: PasswordResetService,
    private renderer: Renderer2
  ) {
    this.form = this.buildForm();
    this.userRecaptcha = '';
  }

  ngOnInit(): void {
    let script = this.renderer.createElement('script');
    script.defer = true;
    script.async = true;
    script.src="https://www.google.com/recaptcha/api.js";
    this.renderer.appendChild(document.body, script);
  }

  onSubmit() {
    this.submitted = true;
    if(this.form.invalid || this.userRecaptcha == ''){
      return;
    }
      const forgotPasswordRequest = new ForgotPasswordCreateDto(this.form.value['email'], this.userRecaptcha!);
      this.service.sendResetPasswordRequest(forgotPasswordRequest).subscribe(()=>{

          this.form.reset();
          this.submitted = false;
          alert("Um link para recuperação sera enviado no email informado. Por favor confira sua caixa de entrada")
        }
      );

  }

  emailErrors() {
    return this.form.get('email')?.errors;
  }

  resolved(captchaResponse: string): void {
    this.userRecaptcha = captchaResponse;
  }

  buildForm(): FormGroup{
    return this.fb.group({
      email: ["",
        [Validators.required, Validators.email, Validators.maxLength(349)]]
    });
  }
}
