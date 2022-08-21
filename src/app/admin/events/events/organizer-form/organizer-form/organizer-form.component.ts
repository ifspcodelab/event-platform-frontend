import { Observable } from 'rxjs';
import { Violation } from './../../../../../core/models/problem-detail';
import { HttpErrorResponse } from '@angular/common/http';
import { AppValidators } from 'src/app/core/validators/app-validator';
import { AccountDto } from './../../../../../core/models/account.model';
import { debounceTime, distinctUntilChanged, filter, first, switchMap, tap } from 'rxjs/operators';
import { EventDto } from './../../../../../core/models/event.model';
import { OrganizerDto } from './../../../../../core/models/organizer.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrganizerService } from './../../../../../core/services/organizer.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { OrganizerType } from 'src/app/core/models/organizer-type.model';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-organizer-form',
  templateUrl: './organizer-form.component.html',
  styleUrls: ['./organizer-form.component.scss']
})
export class OrganizerFormComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;
  organizersType: any = [];
  organizerType = OrganizerType;
  organizersDto: OrganizerDto[] = [];
  accounts: AccountDto[] = [];
  nameControl: FormControl = new FormControl();
  selectedOrganizerId: string;

  constructor(
    private organizerService: OrganizerService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<OrganizerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { eventId: string, accountId: string, organizerDto: OrganizerDto },
  ) {
    this.organizersType = Object.keys(this.organizerType);
  }

  ngOnInit(): void {
    this.form = this.buildForm();
    this.autocomplete();
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      accountId: ['', [Validators.required, AppValidators.notBlank]],
      type: ['', [Validators.required]],
    });
  }

  autocomplete() {
    this.nameControl.valueChanges
        .pipe(
          filter(res => res !== null && res.length >= 2),
          distinctUntilChanged(),
          debounceTime(600),
          switchMap(value => this.organizerService.findByName(value))
        )
        .subscribe({
          next: accounts => this.organizersDto = accounts
        });
  }

  onSelected(event: MatAutocompleteSelectedEvent) {
    this.selectedOrganizerId = event.option.id;
    this.field('accountId').patchValue(this.selectedOrganizerId);
  }

  onSubmit() {
    this.submitted = true;

    if(this.form.invalid) {
      return;
    }

    this.addOrganizer();
  }

  addOrganizer() {
    if(this.form) {
      this.organizerService.postOrganizer(this.data.eventId, this.data.accountId, this.form.value)
          .pipe(first())
          .subscribe({
            next: organizerDto => this.dialogRef.close(organizerDto),
            error: error => this.handleError(error)
          });
    }
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
        const nameField = this.field('accountId');
        nameField.setErrors({ serverError: `Organizador já existente com nome ${nameField.value}` })
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
