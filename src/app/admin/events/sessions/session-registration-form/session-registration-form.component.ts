import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AccountDto } from "../../../../core/models/account.model";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AppValidators } from "../../../../core/validators/app-validator";
import { debounceTime, distinctUntilChanged, filter, first, switchMap } from "rxjs";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { HttpErrorResponse } from "@angular/common/http";
import { ProblemDetail, Violation } from "../../../../core/models/problem-detail";
import { RegistrationService } from "../../../../core/services/registration.service";
import { AccountService } from "../../../../core/services/account.service";

@Component({
  selector: 'app-session-registration-form',
  templateUrl: './session-registration-form.component.html',
  styleUrls: ['./session-registration-form.component.scss']
})
export class SessionRegistrationFormComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;
  accounts: AccountDto[] = [];

  nameControl: FormControl = new FormControl();
  selectedAccountId: string;

  constructor(
    private registrationService: RegistrationService,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<SessionRegistrationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { eventId: string, subeventId: string, activityId: string, sessionId: string }
  ) { }

  ngOnInit(): void {
    this.form = this.buildForm();
    this.autocomplete();
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      accountId: ['', [Validators.required, AppValidators.notBlank]],
    });
  }

  autocomplete() {
    this.nameControl.valueChanges
      .pipe(
        filter(res => res !== null && res.length >= 2),
        distinctUntilChanged(),
        debounceTime(600),
        switchMap(value => this.accountService.findByName(value))
      )
      .subscribe({
        next: accounts => this.accounts = accounts
      });
  }

  onSelected(event: MatAutocompleteSelectedEvent) {
    this.selectedAccountId = event.option.id;
    this.field('accountId').patchValue(this.selectedAccountId)
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    if(this.data.subeventId) {
      this.addAccountToSubEventSession();
    } else {
      this.addAccountToEventSession();
    }
  }

  private addAccountToSubEventSession() {
    this.registrationService
      .postSubEventRegistrations(this.data.eventId, this.data.subeventId, this.data.activityId, this.data.sessionId, this.form.value)
        .pipe(first())
        .subscribe({
          next: registrationDto => this.dialogRef.close(registrationDto),
          error: error => this.handleError(error)
        });
  }

  private addAccountToEventSession() {
    this.registrationService
      .postEventRegistrations(this.data.eventId, this.data.activityId, this.data.sessionId, this.form.value)
        .pipe(first())
        .subscribe({
          next: registrationDto => this.dialogRef.close(registrationDto),
          error: error => this.handleError(error)
        });
  }

  handleError(error: any) {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 400) {
        const violations: Violation[] = error.error;
        violations.forEach(violation => this.nameControl.setErrors({ serverError: violation.message }))
      }
      if(error.status === 409) {
        const problem: ProblemDetail = error.error;
        this.nameControl.setErrors({ serverError: problem.violations[0].message })
      }
    }
  }

  field(path: string) {
    return this.form.get(path)!;
  }

  fieldErrors(path: string) {
    return this.field(path).errors;
  }

}
