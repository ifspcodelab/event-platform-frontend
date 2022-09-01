import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EventService } from "../../../../core/services/event.service";
import { first } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { AppValidators} from "../../../../core/validators/app-validator";
import { EventDto } from "../../../../core/models/event.model";
import { HttpErrorResponse } from "@angular/common/http";
import { ProblemDetail, Violation } from "../../../../core/models/problem-detail";
import { NotificationService } from "../../../../core/services/notification.service";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { eventEditorConfig } from "../../../../core/configs/rich-text.config";

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;
  createMode: boolean;
  eventId: string;
  eventDto: EventDto;
  editorConfig: AngularEditorConfig = eventEditorConfig;

  constructor(
    private eventService: EventService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.form = this.buildForm();
    this.eventId = this.route.snapshot.paramMap.get('eventId');

    if(this.eventId) {
      this.createMode = false;
      this.fetchEvent();
    } else {
      this.createMode = true;
    }
  }

  fetchEvent() {
    this.eventService.getEventById(this.eventId)
      .pipe(first())
      .subscribe(
        eventDto => {
          this.eventDto = eventDto;
          this.form.patchValue(this.eventDto);
          this.form.get('registrationPeriod.startDate').patchValue(new Date(this.eventDto.registrationPeriod.startDate.replace(/-/g, '/')));
          this.form.get('registrationPeriod.endDate').patchValue(new Date(this.eventDto.registrationPeriod.endDate.replace(/-/g, '/')));
          this.form.get('executionPeriod.startDate').patchValue(new Date(this.eventDto.executionPeriod.startDate.replace(/-/g, '/')));
          this.form.get('executionPeriod.endDate').patchValue(new Date(this.eventDto.executionPeriod.endDate.replace(/-/g, '/')));
        }
      );
  }

  private buildForm() {
    return this.formBuilder.group({
      title: ['',
        [
          Validators.required,
          AppValidators.notBlank,
          Validators.minLength(3),
          Validators.maxLength(100)
        ]
      ],
      slug: ['', [Validators.required, AppValidators.notBlank, Validators.minLength(3), Validators.maxLength(100)]],
      summary: ['',
        [
          Validators.required,
          AppValidators.notBlank,
          Validators.minLength(50),
          Validators.maxLength(150)
        ]
      ],
      presentation: ['',
        [
          Validators.required,
          AppValidators.notBlank,
          Validators.minLength(100),
          Validators.maxLength(5000)
        ]
      ],
      contact: ['', [Validators.required, AppValidators.notBlank, Validators.minLength(50), Validators.maxLength(5000)]],
      registrationPeriod: this.formBuilder.group({
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]]
      }),
      executionPeriod: this.formBuilder.group({
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]]
      }),
      smallerImage: [''],
      biggerImage: ['']
    });
  }

  onSubmit() {
    this.submitted = true;

    if(this.form.invalid) {
      return;
    }

    if(this.createMode) {
      this.createEvent();
    } else {
      this.updateEvent();
    }
  }

  getBackUrl() {
    if(this.createMode) {
      this.router.navigate(['admin', 'events']);
    } else {
      this.router.navigate(['admin', 'events', this.eventId]);
    }
  }

  createEvent() {
    if(this.form) {
      this.eventService.postEvent(this.form.value)
        .pipe(first())
        .subscribe({
          next: eventDto => {
            this.notificationService.success("Cadastrado com sucesso");
            this.router.navigate(['admin', 'events', eventDto.id]);
          },
          error: error => this.handleError(error)
        });
    }
  }

  updateEvent() {
    this.eventService.putEvent(this.eventId, this.form.value)
      .pipe(first())
      .subscribe({
        next: eventDto => {
          if(eventDto) {
            this.notificationService.success("Editado com sucesso");
            this.router.navigate(['admin', 'events', eventDto.id]);
          }
        },
        error: error => this.handleError(error)
      });
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

          if(violation.name == "executionPeriod") {
            this.form.get('executionPeriod.endDate').setErrors({ serverError: violation.message });
          }

          if(violation.name == "registrationPeriod") {
            this.form.get('registrationPeriod.endDate').setErrors({ serverError: violation.message });
          }
        })
      }

      if(error.status === 409) {
        const problem: ProblemDetail = error.error;
        if(problem.title === "Resource already exists exception") {
          // Depois será melhorado
          const violation = problem.violations[0];
          if(violation.message.includes("title")) {
            this.form.get("title").setErrors({ serverError: 'Já existe um evento com esse título' });
          }
          if(violation.message.includes("slug")) {
            this.form.get("slug").setErrors({ serverError: 'Já existe um evento com esse slug' });
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
