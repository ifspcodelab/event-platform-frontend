import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { EventService } from "../../../../core/services/event.service";
import { first } from "rxjs";
import { Router } from "@angular/router";

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

  private buildForm() {
    return this.formBuilder.group({
      title: [''],
      slug: [''],
      summary: [''],
      presentation: [''],
      registrationPeriod: this.formBuilder.group({
        startDate: [''],
        endDate: ['']
      }),
      executionPeriod: this.formBuilder.group({
        startDate: [''],
        endDate: ['']
      }),
      smallerImage: [''],
      biggerImage: ['']
    })
  }

  onSubmit() {
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
