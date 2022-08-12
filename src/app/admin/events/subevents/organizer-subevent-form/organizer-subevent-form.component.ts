import { first } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { OrganizerSubeventService } from 'src/app/core/services/organizer-subevent.service';
import { OrganizerSubeventDto } from 'src/app/core/models/organizer-subevent.model';
import { OrganizerType } from 'src/app/core/models/organizer-type.model';

@Component({
  selector: 'app-organizer-form',
  templateUrl: './organizer-subevent-form.component.html',
  styleUrls: ['./organizer-subevent-form.component.scss']
})
export class OrganizerSubeventFormComponent implements OnInit {
  form: FormGroup = this.buildForm();
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
    this.createOrganizerSubevent();
  }

  createOrganizerSubevent() {
    if(this.form) {
      this.organizerSubeventService.postOrganizerSubevent(this.data.eventId, this.data.subeventId, this.data.accountId, this.form.value)
          .pipe(first())
          .subscribe(organizerSubeventDto => {
            this.dialogRef.close(organizerSubeventDto);
          });
    }
  }

}
