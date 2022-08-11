import {Component, OnInit, Renderer2} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PasswordResetService } from "../../../core/services/password-reset.service";
import {ForgotPasswordCreateDto} from "../../../core/models/forgot-password-create-dto.model";
import {Router} from "@angular/router";
import {NotificationService} from "../../../core/services/notification.service";
import {ToastService} from "../../../core/services/toast.service";

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
    private renderer: Renderer2,
    private router: Router,
    private notificationService: NotificationService,
    private toaster: ToastService,
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
          this.toaster.success("Um link será enviado ao e-mail informado", "Verifique sua caixa de entrada");
          this.form.reset();
          this.submitted = false;
          this.router.navigateByUrl("/login");
        },
        () => {
          this.toaster.error("Algo de errado com o recapctha", "Tente novamente");
          this.form.reset();
          this.submitted = false;
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
        [Validators.required,
          Validators.email,
          Validators.maxLength(349)]]
    });
  }


}
