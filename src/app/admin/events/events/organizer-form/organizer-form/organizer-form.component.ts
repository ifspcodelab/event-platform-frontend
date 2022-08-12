import { AppValidators } from 'src/app/core/validators/app-validator';
import { MatTableDataSource } from '@angular/material/table';
import { AccountDto } from './../../../../../core/models/account.model';
import { first } from 'rxjs/operators';
import { EventDto } from './../../../../../core/models/event.model';
import { OrganizerDto } from './../../../../../core/models/organizer.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrganizerService } from './../../../../../core/services/organizer.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { OrganizerType } from 'src/app/core/models/organizer-type.model';

@Component({
  selector: 'app-organizer-form',
  templateUrl: './organizer-form.component.html',
  styleUrls: ['./organizer-form.component.scss']
})
export class OrganizerFormComponent implements OnInit {
  form: FormGroup = this.buildForm();
  organizersType: any = [];
  organizerType = OrganizerType;
  organizersDto: OrganizerDto;
  dataSourceOrganizer: MatTableDataSource<OrganizerDto>;

  constructor(
    private organizerService: OrganizerService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<OrganizerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { eventId: string, accountId: string, organizerDto: OrganizerDto },
  ) {
    this.organizersType = Object.keys(this.organizerType);
  }

  ngOnInit(): void {
    console.log(this.data.organizerDto);
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      accountId: ['', [Validators.required, AppValidators.notBlank]],
      type: ['', [Validators.required]],
    })
  }

  onSubmit() {
    this.createOrganizer();
  }

  createOrganizer() {
    if(this.form) {
      this.organizerService.postOrganizer(this.data.eventId, this.data.accountId, this.form.value)
          .pipe(first())
          .subscribe(organizerDto => this.dialogRef.close(organizerDto));
    }
  }

  field(path: string) {
    return this.form.get(path)!;
  }

  fieldErrors(path: string) {
    return this.field(path).errors;
  }
}
