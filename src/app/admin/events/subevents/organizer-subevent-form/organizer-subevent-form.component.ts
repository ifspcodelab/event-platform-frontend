import { OrganizerSubeventDto } from './../../../../core/models/organizer-subevent.model';
import { debounceTime, distinctUntilChanged, filter, first, Observable, switchMap, tap } from "rxjs";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { OrganizerSubeventService } from 'src/app/core/services/organizer-subevent.service';
import { OrganizerType } from 'src/app/core/models/organizer-type.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ProblemDetail, Violation } from 'src/app/core/models/problem-detail';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AppValidators } from 'src/app/core/validators/app-validators';
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { AccountDto } from 'src/app/core/models/account.model';

@Component({
  selector: 'app-organizer-form',
  templateUrl: './organizer-subevent-form.component.html',
  styleUrls: ['./organizer-subevent-form.component.scss']
})
export class OrganizerSubeventFormComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;
  accounts: AccountDto[] = [];
  nameControl: FormControl = new FormControl();
  selectedAccountId: string;
  organizersSubeventType: any = [];
  organizerSubeventType = OrganizerType;

  constructor(
    private notificationService: NotificationService,
    private organizerSubeventService: OrganizerSubeventService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<OrganizerSubeventFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { eventId: string, subeventId: string, accountId: string, organizerSubeventDto: OrganizerSubeventDto },
  ) {
    this.organizersSubeventType = Object.keys(this.organizerSubeventType);
  }

  ngOnInit(): void {
    this.form = this.buildForm();
    this.autocompleteOrganizerSubevent();
  }

  autocompleteOrganizerSubevent() {
    this.nameControl.valueChanges
      .pipe(
        filter(res => res !== null && res.length >= 2),
        distinctUntilChanged(),
        debounceTime(600),
        switchMap(value => this.organizerSubeventService.findByName(value))
      )
      .subscribe({
        next: accounts => this.accounts = accounts
      });
  }

  onSelected(event: MatAutocompleteSelectedEvent) {
    this.selectedAccountId = event.option.id;
    this.field('accountId').patchValue(this.selectedAccountId)
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      accountId: ['', [Validators.required, AppValidators.notBlank]],
      type: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.submitted = true;

    if(this.form.invalid) {
      return;
    }

    this.createOrganizerSubevent();
  }

  createOrganizerSubevent() {
    if(this.form) {
      this.organizerSubeventService.postOrganizerSubevent(this.data.eventId, this.data.subeventId, this.data.accountId, this.form.value)
          .pipe(first())
          .subscribe({
            next: organizerSubeventDto => this.dialogRef.close(organizerSubeventDto),
            error: error => this.handleError(error)
          });
    }
  }

  handleError(error: any) {
    if(error instanceof HttpErrorResponse) {
      if(error.status === 400) {
        const violations: Violation[] = error.error;
        violations.forEach(violation => {
          const formControl = this.form.get(violation.accountId);
          if(formControl) {
            formControl.setErrors({ serverError: violation.message });
          }
        })
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
