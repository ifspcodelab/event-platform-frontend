import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { environment } from "../../../../environments/environment";
import { ActivatedRoute, Router } from "@angular/router";
import { NotificationService } from "../../../core/services/notification.service";
import { AppValidators } from "../../../core/validators/app-validator";
import { HttpErrorResponse } from "@angular/common/http";
import { ProblemDetail } from "../../../core/models/problem-detail";
import { AlterMyDataPasswordDto } from "../../../core/models/alter-my-data-password-dto.model";
import { AlterMyDataPasswordService } from "../../../core/services/alter-my-data-password.service";

@Component({
  selector: 'app-alter-my-data-password',
  templateUrl: './alter-my-data-password.component.html',
  styleUrls: ['./alter-my-data-password.component.scss']
})
export class AlterMyDataPasswordComponent implements OnInit {
  submitted: boolean = false;
  userRecaptcha: string | undefined;
  form: FormGroup;
  hide: boolean = true;
  recaptchaSiteKey: string = environment.recaptchaSiteKey;
  requestLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: AlterMyDataPasswordService,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private router: Router,
    private notificationService: NotificationService,
  ) {
    this.form = this.buildForm();
    this.userRecaptcha = '';
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    if(this.form.invalid || this.userRecaptcha == ''){
      return;
    }
    const alterMyDataPasswordDto = new AlterMyDataPasswordDto(this.form.value['currentPassword'], this.form.value['newPassword'], this.userRecaptcha!);

    this.requestLoading = true;

    this.service.sendAlterPasswordRequest(alterMyDataPasswordDto).subscribe(()=>{
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
      currentPassword: ["", [ Validators.required ]],
      newPassword: ["",
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



