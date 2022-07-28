import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EventService } from "../../../../core/services/event.service";
import { first } from "rxjs";
import { ActivatedRoute, Router} from "@angular/router";
import { AppValidators} from "../../../../core/validators/app-validator";
import { EventDto } from "../../../../core/models/event.model";
import { HttpErrorResponse } from "@angular/common/http";
import { ProblemDetail, Violation } from "../../../../core/models/problem-detail";
import { NotificationService } from "../../../../core/services/notification.service";

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  form: FormGroup = this.buildForm();
  submitted: boolean = false;
  createMode: boolean;
  eventId: string;
  eventDto: EventDto;

  constructor(
    private eventService: EventService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
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
        }
      );
  }

  field(path: string) {
    return this.form.get(path)!;
  }

  fieldErrors(path: string) {
    return this.field(path)?.errors;
  }

  private buildForm() {
    return this.formBuilder.group({
      title: ['',
        [
          Validators.required,
          AppValidators.notBlank,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]
      ],
      slug: ['',
        [Validators.required, AppValidators.notBlank]
      ],
      summary: ['',
        [
          Validators.required,
          AppValidators.notBlank,
          Validators.minLength(100),
          Validators.maxLength(150)
        ]
      ],
      presentation: ['',
        [
          Validators.required,
          AppValidators.notBlank,
          Validators.minLength(1000),
          Validators.maxLength(5000)
        ]
      ],
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
    })
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
        .subscribe(eventDto => {
          console.log(eventDto);
          this.router.navigate(['admin', 'events', eventDto.id]);
        },
          error => this.handleError(error)
        );
    }
  }

  updateEvent() {
    this.eventService.putEvent(this.eventId, this.form.value)
      .pipe(first())
      .subscribe(eventDto => {
        if(eventDto) {
          console.log(eventDto);
          this.router.navigate(['admin', 'events', eventDto.id]);
        }
      },
        error => this.handleError(error)
      );
  }

  handleError(error: any) {
    if(error instanceof HttpErrorResponse) {
      console.log(error);
      if(error.status === 400) {
        const violations: Violation[] = error.error;
        violations.forEach(violation => {
          const formControl = this.form.get(violation.name);
          if(formControl) {
            formControl.setErrors({
              serverError: violation.message
            });
            console.log(formControl);
          }
        })
      }

      if(error.status === 409) {
        const problem: ProblemDetail = error.error;
        this.notificationService.error(problem.violations[0].message);
      }
    }
  }

  // base64Output: string;
  //
  // onSmallerImageChange(event: any) {
  //   console.log(event)
  //   this.convertFile(event.target.files[0])
  //     .subscribe(base64 => {
  //       this.base64Output = base64;
  //       console.log(this.base64Output);
  //     });
  // }
  //
  // convertFile(file : File) : Observable<string> {
  //   const result = new ReplaySubject<string>(1);
  //   const reader = new FileReader();
  //   reader.readAsBinaryString(file);
  //   reader.onload = (event) => result.next(btoa(event.target.result.toString()));
  //   return result;
  // }

}
