import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { HttpErrorResponse } from "@angular/common/http";
import { ProblemDetail, Violation } from "../../../../core/models/problem-detail";
import { debounceTime, distinctUntilChanged, filter, first, Observable, switchMap, tap } from "rxjs";
import { ActivitySpeakerService } from "../../../../core/services/activity-speaker.service";
import { AppValidators } from "../../../../core/validators/app-validator";
import { SpeakerService } from "../../../../core/services/speaker.service";
import { SpeakerDto } from "../../../../core/models/speaker.model";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";

@Component({
  selector: 'app-activity-speaker-form',
  templateUrl: './activity-speaker-form.component.html',
  styleUrls: ['./activity-speaker-form.component.scss']
})
export class ActivitySpeakerFormComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;
  speakers: SpeakerDto[] = [];
  nameControl: FormControl = new FormControl();
  selectedSpeakerId: string;

  constructor(
    private activitySpeakerService: ActivitySpeakerService,
    private speakerService: SpeakerService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ActivitySpeakerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { eventId: string, subeventId: string, activityId: string }
  ) { }

  ngOnInit(): void {
    this.form = this.buildForm();
    this.autocomplete();
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      speakerId: ['', [Validators.required, AppValidators.notBlank]],
    });
  }

  autocomplete() {
    this.nameControl.valueChanges
      .pipe(
        filter(res => res !== null && res.length >= 2),
        distinctUntilChanged(),
        debounceTime(600),
        switchMap(value => this.speakerService.findByName(value))
      )
      .subscribe({
        next: speakers => this.speakers = speakers
      });
  }

  onSelected(event: MatAutocompleteSelectedEvent) {
    this.selectedSpeakerId = event.option.id;
    this.field('speakerId').patchValue(this.selectedSpeakerId)
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    if(this.data.subeventId) {
      this.addActivitySpeakerToSubEvent();
    } else {
      this.addActivitySpeakerToEvent();
    }
  }

  private addActivitySpeakerToSubEvent() {
    this.activitySpeakerService.postSubEventActivitySpeakers(this.data.eventId, this.data.subeventId, this.data.activityId, this.form.value)
      .pipe(first())
      .subscribe({
        next: activitySpeakerDto => this.dialogRef.close(activitySpeakerDto),
        error: error => this.handleError(error)
      });
  }

  private addActivitySpeakerToEvent() {
    this.activitySpeakerService.postEventActivitySpeakers(this.data.eventId, this.data.activityId, this.form.value)
      .pipe(first())
      .subscribe({
        next: activitySpeakerDto => this.dialogRef.close(activitySpeakerDto),
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
