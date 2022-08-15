import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppValidators } from "../../../core/validators/app-validator";
import { MyDataService } from "../../../core/services/my-data.service";
import { NotificationService } from "../../../core/services/notification.service";
import { Router } from "@angular/router";
import { first } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { ProblemDetail, Violation } from "../../../core/models/problem-detail";

@Component({
  selector: 'app-my-data-edit',
  templateUrl: './my-data-edit.component.html',
  styleUrls: ['./my-data-edit.component.scss']
})
export class MyDataEditComponent implements OnInit {
  form: FormGroup = this.buildForm();
  userReCaptcha: string | undefined = '';

  constructor(
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private myDataService: MyDataService,
    private notificationService: NotificationService,
    private router: Router,
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
    this.updateAccount();
  }

  private updateAccount() {
    this.myDataService.patchAccount(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.notificationService.success("Dados editados com sucesso");
          this.router.navigate(['meus-dados']);
        },
        error: error => this.handleError(error)
      });
  }

  handleError(error: any) {
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
          this.notificationService.error(problem.violations[0].message);
        }
      }
    }
  }

  resolved(captchaResponse: string): void {
    this.userReCaptcha = captchaResponse;
  }
}
