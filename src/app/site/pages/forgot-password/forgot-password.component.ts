import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PasswordResetService } from "../../../core/services/password-reset.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  submitted: boolean = false;
  isFormValid: boolean = false;
  form: FormGroup;
  captcha: string;

  constructor(
    private fb: FormBuilder,
    private service: PasswordResetService
  ) {
    this.form = this.buildForm();
    this.captcha = '';
  }

  ngOnInit(): void {
  }

  onNext(){
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
    this.isFormValid = true;
  }

  onSubmit() {

    if (this.captcha !== ''){

      this.service.sendResetPasswordRequest(this.form.value).subscribe(()=>{

          this.form.reset();
          this.submitted = false;
          alert("Um link para recuperação sera enviado no email informado.")
        }
      );
    }

  }

  buildForm(): FormGroup{
    return this.fb.group({
      email: ["",
        [Validators.required, Validators.email, Validators.maxLength(349)]]
    });
  }

  emailErrors() {
    return this.form.get('email')?.errors;
  }

  resolved(captchaResponse: string){
      this.captcha = captchaResponse;
      console.log('captcha: ' + this.captcha);
  }
}
