import { first } from 'rxjs/operators';
import { EventDto } from './../../../../../core/models/event.model';
import { OrganizerDto } from './../../../../../core/models/organizer.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrganizerService } from './../../../../../core/services/organizer.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-organizer-form',
  templateUrl: './organizer-form.component.html',
  styleUrls: ['./organizer-form.component.scss']
})
export class OrganizerFormComponent implements OnInit {
  form: FormGroup = this.buildForm();
  organizerDto: OrganizerDto;

  constructor(
    private organizerService: OrganizerService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<OrganizerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { eventDto: EventDto, organizerDto: OrganizerDto },
  ) { }

  ngOnInit(): void {
    console.log(this.data.organizerDto);
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      type: ['']
    })
  }

  onSubmit() {
    this.createOrganizer();
  }

  createOrganizer() {
    if(this.form) {
      this.organizerService.postOrganizer(this.data.eventDto.id, this.form.value)
          .pipe(first())
          .subscribe(organizerDto => {
            this.dialogRef.close(organizerDto);
          })
    }
  }

}
