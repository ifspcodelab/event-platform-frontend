import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EventService } from "../../../../core/services/event.service";
import { first } from "rxjs";
import { ActivatedRoute, Router} from "@angular/router";
import { AppValidators} from "../../../../core/validators/app-validator";
import { EventDto } from "../../../../core/models/event.model";

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  form: FormGroup = this.buildForm();
  createMode: boolean;
  eventId: string;
  eventDto: EventDto;

  constructor(
    private eventService: EventService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
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
    if(this.form.invalid) {
      return;
    }
    if(this.createMode) {
      this.createEvent();
    } else {
      this.updateEvent();
    }
  }

  createEvent() {
    if(this.form) {
      this.eventService.postEvent(this.form.value)
        .pipe(first())
        .subscribe(eventDto => {
          console.log(eventDto);
          this.router.navigate(['admin', 'events', eventDto.id]);
        })
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
      })
  }
}
