import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { environment } from "../../../../environments/environment";
import { MyDataAlterPasswordService } from "../../../core/services/my-data-alter-password.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NotificationService } from "../../../core/services/notification.service";
import { JwtService } from "../../../core/services/jwtservice.service";
import { HttpErrorResponse } from "@angular/common/http";
import { ProblemDetail } from "../../../core/models/problem-detail";
import { AppValidators } from "../../../core/validators/app-validator";
import { MyDataAlterPasswordDto } from "../../../core/models/alter-my-data-password-dto.model";

@Component({
  selector: 'app-my-data-alter-password',
  templateUrl: './my-data-alter-password.component.html',
  styleUrls: ['./my-data-alter-password.component.scss']
})
export class MyDataAlterPasswordComponent implements OnInit {
  submitted: boolean = false;
  userRecaptcha: string | undefined;
  form: FormGroup;
  hideCurrent: boolean = true;
  hideNew: boolean = true;
  recaptchaSiteKey: string = environment.recaptchaSiteKey;
  requestLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: MyDataAlterPasswordService,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private router: Router,
    private notificationService: NotificationService,
    private jwtService: JwtService,
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
    const myDataAlterPasswordDto = new MyDataAlterPasswordDto(this.form.value['currentPassword'], this.form.value['newPassword'], this.userRecaptcha!);

    this.requestLoading = true;

    this.service.sendAlterPasswordRequest(myDataAlterPasswordDto).subscribe(()=>{
        this.notificationService.success("Parabéns. Sua senha foi alterada com sucesso")
        this.jwtService.removeAccessToken();
        this.jwtService.removeRefreshToken();
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
    this.requestLoading = false;
    this.refresh();
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

  refresh(): void {
    grecaptcha.reset();
  }
}



