import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { EventService } from "../../../../core/services/event.service";
import { first } from "rxjs";
import { Router } from "@angular/router";
import { AppValidators} from "../../../../core/validators/app-validator";

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {
  form: FormGroup = this.buildForm();

  constructor(
    private eventService: EventService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
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
    this.createEvent();
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
}
