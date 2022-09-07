import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EventDto } from "../../../core/models/event.model";
import { SiteService } from "../../services/site.service";

@Component({
  selector: 'app-my-registration',
  templateUrl: './my-registration.component.html',
  styleUrls: ['./my-registration.component.scss']
})
export class MyRegistrationComponent implements OnInit {
  form: FormGroup;
  eventsDto: EventDto[];
  eventSelected: EventDto;

  constructor(
    private formBuilder: FormBuilder,
    private siteService: SiteService
  ) { }

  ngOnInit(): void {
    this.form = this.buildForm();
    this.fetchEvents();
  }

  fetchEvents() {
    this.siteService.getEvents()
      .subscribe(events => {
        this.eventsDto = events;
        this.form.get('event').setValue(this.eventsDto[0].title);
      })
  }

  private buildForm() {
    return this.formBuilder.group({
      event: ['',  [Validators.required]]
    });
  }

  field(path: string) {
    return this.form.get(path)!;
  }

  fieldErrors(path: string) {
    return this.field(path)?.errors;
  }

}
