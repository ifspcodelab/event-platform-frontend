import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NotificationService } from "../../../core/services/notification.service";
import { first } from "rxjs";
import { AccountRole} from "../../../core/models/account-role.model";
import { AppValidators } from "../../../core/validators/app-validator";
import { HttpErrorResponse } from "@angular/common/http";
import { ProblemDetail, Violation } from "../../../core/models/problem-detail";
import { AccountService } from "../../../core/services/account.service";
import { AccountDto } from "../../../core/models/account.model";


@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent implements OnInit {

  form: FormGroup;
  submitted: boolean = false;
  accountId: string;
  accountDto: AccountDto;
  accountRole = AccountRole;
  enumKeys: any = [];

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {
    this.enumKeys = Object.keys(this.accountRole);
  }

  ngOnInit(): void {
    this.accountId = this.route.snapshot.paramMap.get('accountId');
    this.form = this.buildForm();
    this.fetchAccount();
  }

  fetchAccount() {
    this.accountService.getAccountById(this.accountId)
      .pipe(first())
      .subscribe(
        accountDto => {
          this.accountDto = accountDto;
          this.form.patchValue(this.accountDto);
        }
      )
  }

  private buildForm() {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256), AppValidators.notBlank, AppValidators.validName]],
      cpf: ['', [Validators.required, AppValidators.validCpf]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(350)]],
      agreed: ['', []],
      role: ['', []],
      verified: ['', []],
      registrationTimestamp: ['', []],
    });
  }

  onSubmit() {
    this.submitted = true;
    if(this.form.invalid) {
      return;
    }
    this.updateAccount();
  }


  private updateAccount() {
    this.accountService.putAccount(this.accountId, this.form.value)
      .pipe(first())
      .subscribe({
        next: accountDto => {
          this.notificationService.success("Usuário atualizado com sucesso");
          return this.router.navigate(['admin', 'accounts', accountDto.id]);
        },
        error: error => this.handleError(error)
      });
  }

  private handleError(error: any) {
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
          const violation = problem.violations[0];
          if(violation.message.includes("cpf")) {
            this.form.get("cpf").setErrors({ serverError: 'Já existe um usuário com esse cpf' });
          }

          if(violation.message.includes("email")) {
            this.form.get("email").setErrors({ serverError: 'Já existe um usuário com esse email' });
          }
        } else {
          this.notificationService.error(problem.violations[0].message);
        }
      }
    }
  }

  getBackUrl() {
    return this.router.navigate(['admin', 'accounts', this.accountId]);
  }

  field(path: string) {
    return this.form.get(path)!;
  }

  fieldErrors(path: string) {
    return this.field(path)?.errors;
  }

}
