import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PasswordResetService } from "../../../core/services/password-reset.service";
import { PasswordResetDto } from "../../../core/models/password-reset-dto";
import { ActivatedRoute, Router } from "@angular/router";
import { AppValidators } from "../../../core/validators/app-validators";
import { HttpErrorResponse } from "@angular/common/http";
import { ProblemDetail } from "../../../core/models/problem-detail";
import { environment } from "../../../../environments/environment";
import { NotificationService } from "../../../core/services/notification.service";


@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  submitted: boolean = false;
  userRecaptcha: string | undefined;
  token: string | null | undefined;
  form: FormGroup;
  hide: boolean = true;
  recaptchaSiteKey: string = environment.recaptchaSiteKey;
  requestLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: PasswordResetService,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private router: Router,
    private notificationService: NotificationService,
  ) {
    this.form = this.buildForm();
    this.userRecaptcha = '';
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
  }

  onSubmit() {
    this.submitted = true;
    if(this.form.invalid || this.userRecaptcha == ''){
      return;
    }
    const passwordResetDto = new PasswordResetDto(this.form.value['password'], this.token!, this.userRecaptcha!);

    this.requestLoading = true;

    this.service.sendPasswordAndToken(passwordResetDto).subscribe(()=>{
        this.notificationService.success("Parabéns. Sua senha foi alterada com sucesso")
        this.router.navigateByUrl("/login");
        this.form.reset();
        this.submitted = false;
        this.requestLoading = false;
      },
      error => {
        this.handleError(error);
        this.form.reset();
        this.submitted = false;
        this.requestLoading = false;
      });
  }

  handleError(error: any) {
    if(error instanceof HttpErrorResponse) {
      const problem: ProblemDetail = error.error;
      if (problem.title == "Token not valid"){
        this.notificationService.error("Algo de errado com a requisição. Utilize apenas o link válido");
      }
      if (problem.title == "Invalid recaptcha"){
        this.notificationService.error("Recaptcha inválido. Atualize e tente novamente");
      }
    }
  }

  field(path: string) {
    return this.form.get(path)!;
  }

  fieldErrors(path: string) {
    return this.field(path)?.errors;
  }

  buildForm(): FormGroup{
    return this.form = this.fb.group({
      password: ["",
        [ Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64),
          AppValidators.validPassword()]]
    });
  }

  resolved(captchaResponse: string): void {
    this.userRecaptcha = captchaResponse;
  }
}

