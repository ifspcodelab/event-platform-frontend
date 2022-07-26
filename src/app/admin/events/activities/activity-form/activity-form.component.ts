import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivityDto } from "../../../../core/models/activity.model";
import { EventService } from "../../../../core/services/event.service";
import { ActivityService } from "../../../../core/services/activity.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NotificationService } from "../../../../core/services/notification.service";
import { AppValidators } from "../../../../core/validators/app-validator";
import { ActivityType } from "../../../../core/models/activity-type.model";
import { first } from "rxjs";
import { ProblemDetail, Violation } from "../../../../core/models/problem-detail";
import { HttpErrorResponse } from "@angular/common/http";
import { ActivityModality } from "../../../../core/models/activity-modality.model";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { eventEditorConfig } from "../../../../core/configs/rich-text.config";

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;
  createMode: boolean = true;
  eventMode: boolean = true;
  activityId: string;
  activityDto: ActivityDto;
  activityType = ActivityType;
  activityModality = ActivityModality;
  enumKeys: any = [];
  enumKeysModality: any = [];
  eventId: string;
  eventDto: string;
  subeventId: string;
  subeventDto: string;
  editorConfig: AngularEditorConfig = eventEditorConfig;

  constructor(
    private eventService: EventService,
    private activityService: ActivityService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {
    this.enumKeys = Object.keys(this.activityType);
    this.enumKeysModality = Object.keys(this.activityModality);
  }

  ngOnInit(): void {
    this.form = this.buildForm();

    this.eventId = this.route.snapshot.paramMap.get('eventId');
    this.subeventId = this.route.snapshot.paramMap.get('subeventId');
    this.activityId = this.route.snapshot.paramMap.get('activityId');

    if(this.subeventId) {
      this.eventMode = false;
    }

    if(this.activityId) {
      this.createMode = false;

      if(this.eventMode) {
        this.fetchEventActivity()
      } else {
        this.fetchSubEventActivity()
      }
    }
  }

  fetchEventActivity() {
    this.activityService.getEventActivity(this.eventId, this.activityId)
      .pipe(first())
      .subscribe(
        activityDto => {
          this.activityDto = activityDto;
          this.form.patchValue(this.activityDto);
        }
      )
  }

  fetchSubEventActivity() {
    this.activityService.getSubEventActivity(this.eventId, this.subeventId, this.activityId)
      .pipe(first())
      .subscribe(
        activityDto => {
          this.activityDto = activityDto;
          this.form.patchValue(this.activityDto);
        }
      )
  }

  private buildForm() {
    return this.formBuilder.group({
      title: ['', [Validators.required, AppValidators.notBlank, Validators.minLength(5), Validators.maxLength(200)]],
      slug: ['', [Validators.required, AppValidators.notBlank, Validators.minLength(5), Validators.maxLength(200)]],
      description: ['', [Validators.required, AppValidators.notBlank, Validators.minLength(50), Validators.maxLength(5000)]],
      type: ['', [Validators.required]],
      modality: ['', [Validators.required]],
      duration: [0, [Validators.required, Validators.min(10)]],
      setupTime: [15, [Validators.required, Validators.min(5)]],
      needRegistration: [true, [Validators.required]],
    });
  }

  onSubmit() {
    this.submitted = true;

    if(this.form.invalid) {
      return;
    }

    if(this.createMode) {
      this.createActivity();
    } else {
      this.updateActivity();
    }
  }

  getBackUrl() {
    if(this.createMode) {
      if(this.eventMode) {
        return this.router.navigate(['admin', 'events', this.eventId], { queryParams: { tab: 2 }});
      } else {
        return this.router.navigate(['admin', 'events', this.eventId, 'sub-events', this.subeventId], { queryParams: { tab: 2 }});
      }
    } else {
      if(this.eventMode) {
        return this.router.navigate(['admin', 'events', this.eventId, 'activities', this.activityId]);
      } else {
        return this.router.navigate(['admin', 'events', this.eventId, 'sub-events', this.subeventId, 'activities', this.activityId]);
      }
    }
  }

  private createActivity() {
    if(this.eventMode) {
      this.createEventActivity();
    } else {
      this.createSubEventActivity();
    }
  }

  private updateActivity() {
    if(this.eventMode) {
      this.updateEventActivity();
    } else {
      this.updateSubEventActivity();
    }
  }

  private createEventActivity() {
    this.activityService.postEventActivity(this.eventId, this.form.value)
      .pipe(first())
      .subscribe({
        next: activityDto => {
          this.notificationService.success('Atividade cadastrada com sucesso');
          this.router.navigate(['admin', 'events', this.eventId, 'activities', activityDto.id]);
        },
        error: error => this.handleError(error)
      })
  }

  private createSubEventActivity() {
    this.activityService.postSubEventActivity(this.eventId, this.subeventId, this.form.value)
      .pipe(first())
      .subscribe({
        next: activityDto => {
          this.notificationService.success('Atividade cadastrada com sucesso');
          this.router.navigate(['admin', 'events', this.eventId, 'sub-events', this.subeventId, 'activities', activityDto.id]);
        },
        error: error => this.handleError(error)
      })
  }

  private updateEventActivity() {
    this.activityService.putEventActivity(this.eventId, this.activityId, this.form.value)
      .pipe(first())
      .subscribe({
        next: activityDto => {
          this.notificationService.success('Atividade atualizada com sucesso');
          this.router.navigate(['admin', 'events', this.eventId, 'activities', activityDto.id]);
        },
        error: error => this.handleError(error)
      })
  }

  private updateSubEventActivity() {
    this.activityService.putSubEventActivity(this.eventId, this.subeventId, this.activityId, this.form.value)
      .pipe(first())
      .subscribe({
        next: activityDto => {
          this.notificationService.success('Atividade atualizada com sucesso');
          this.router.navigate(['admin', 'events', this.eventId, 'sub-events', this.subeventId, 'activities', activityDto.id]);
        },
        error: error => this.handleError(error)
      })
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
          const violation = problem.violations[0];
          if(violation.message.includes("title")) {
            this.form.get("title").setErrors({ serverError: 'Já existe uma atividade com esse título' });
          }
          if(violation.message.includes("slug")) {
            this.form.get("slug").setErrors({ serverError: 'Já existe uma atividade com esse slug' });
          }
        } else {
          this.notificationService.error(problem.violations[0].message);
        }
      }
    }
  }

  field(path: string) {
    return this.form.get(path)!;
  }

  fieldErrors(path: string) {
    return this.field(path)?.errors;
  }
}
