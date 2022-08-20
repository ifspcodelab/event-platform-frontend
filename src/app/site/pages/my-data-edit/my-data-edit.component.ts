import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppValidators } from "../../../core/validators/app-validator";
import { MyDataService } from "../../../core/services/my-data.service";
import { NotificationService } from "../../../core/services/notification.service";
import { Router } from "@angular/router";
import { first } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { ProblemDetail, Violation } from "../../../core/models/problem-detail";
import { environment } from "../../../../environments/environment";
import { AccountDto, MyDataDto } from "../../../core/models/account.model";

@Component({
  selector: 'app-my-data-edit',
  templateUrl: './my-data-edit.component.html',
  styleUrls: ['./my-data-edit.component.scss']
})
export class MyDataEditComponent implements OnInit {
  accountDto: AccountDto;
  form: FormGroup;
  userRecaptcha: string | undefined = '';
  recaptchaSiteKey: string = environment.recaptchaSiteKey;
  requestLoading: boolean = false;
  recaptchaErrorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private myDataService: MyDataService,
    private notificationService: NotificationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.fetchAccount();
  }

  fetchAccount() {
    this.myDataService.getAccount()
      .pipe(first())
      .subscribe(
        accountDto => {
          this.accountDto = accountDto;
          this.form = this.buildForm();
        }
      );
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      name: [this.accountDto.name, [Validators.required, Validators.minLength(5), Validators.maxLength(256), AppValidators.validName()]],
      cpf: [this.accountDto.cpf, [Validators.required, AppValidators.validCpf()]],
    });
  }

  field(path: string) {
    return this.form.get(path)!;
  }

  fieldErrors(path: string) {
    return this.field(path)?.errors;
  }

  onSubmit(): void {
    if (this.form.invalid || this.userRecaptcha == '') {
      return;
    }
    const myDataDto  = new MyDataDto(this.form.value['name'], this.form.value['cpf'], this.userRecaptcha!);
    this.updateAccount(myDataDto);
  }

  updateAccount(myDataDto: MyDataDto) {
    this.myDataService.patchAccount(myDataDto)
      .pipe(first())
      .subscribe({
        next: () => {
          this.notificationService.success("Dados editados com sucesso");
          this.router.navigate(['meus-dados']);
        },
        error: error => {
          this.handleError(error)
          this.refreshRecaptcha();
        }
      });
  }

  handleError(error: any) {
    this.requestLoading = false;

    if(error instanceof HttpErrorResponse) {
      if(error.status === 400) {
        const violations: Violation[] = error.error;
        violations.forEach(violation => {
          const formControl = this.form.get(violation.name);
          if(formControl) {
            formControl.setErrors({ serverError: violation.message });
          }
        })
      }

      if(error.status === 409) {
        const problem: ProblemDetail = error.error;
        if(problem.title === "Resource already exists exception") {
          this.field('cpf').setErrors({ serverError: 'Já existe uma conta com este CPF' });
        }
        if(problem.title === "Invalid recaptcha") {
          this.recaptchaErrorMessage = "Recaptcha inválido, por favor realize novamente o desafio ou atualize a página";
        }
      }
    }
  }

  resolved(captchaResponse: string): void {
    this.userRecaptcha = captchaResponse;
    this.recaptchaErrorMessage = null;
  }

  refreshRecaptcha(): void {
    grecaptcha.reset();
  }
}
