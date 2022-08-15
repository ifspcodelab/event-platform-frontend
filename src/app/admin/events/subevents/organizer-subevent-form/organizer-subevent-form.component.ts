import { first } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { OrganizerSubeventService } from 'src/app/core/services/organizer-subevent.service';
import { OrganizerSubeventDto } from 'src/app/core/models/organizer-subevent.model';
import { OrganizerType } from 'src/app/core/models/organizer-type.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Violation } from 'src/app/core/models/problem-detail';

@Component({
  selector: 'app-organizer-form',
  templateUrl: './organizer-subevent-form.component.html',
  styleUrls: ['./organizer-subevent-form.component.scss']
})
export class OrganizerSubeventFormComponent implements OnInit {
  form: FormGroup = this.buildForm();
  submitted: boolean = false;
  organizersSubeventType: any = [];
  organizerSubeventType = OrganizerType;

  constructor(
    private organizerSubeventService: OrganizerSubeventService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<OrganizerSubeventFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { eventId: string, subeventId: string, accountId: string, organizerSubeventDto: OrganizerSubeventDto },
  ) {
    this.organizersSubeventType = Object.keys(this.organizerSubeventType);
  }

  ngOnInit(): void {
    console.log(this.data.organizerSubeventDto);
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      accountId: [''],
      organizerSubeventType: [''],
    })
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
        const nameField = this.field('accountId');
        nameField.setErrors({ serverError: `Organizador já existente com id ${nameField.value}` })
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
