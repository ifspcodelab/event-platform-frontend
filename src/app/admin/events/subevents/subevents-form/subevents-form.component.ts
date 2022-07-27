import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {SubeventService} from "../../../../core/services/subevent.service";
import {ActivatedRoute} from "@angular/router";
import {first} from "rxjs";

@Component({
  selector: 'app-subevents-form',
  templateUrl: './subevents-form.component.html',
  styleUrls: ['./subevents-form.component.scss']
})
export class SubeventsFormComponent implements OnInit {
  form: FormGroup = this.buildForm();
  eventId: string;

  constructor(
    private formBuilder: FormBuilder,
    private subeventService: SubeventService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId');
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      title: [''],
      slug: [''],
      summary: [''],
      presentation: [''],
      executionPeriod: this.formBuilder.group({
        startDate: [''],
        endDate: ['']
      }),
      smallerImage: [''],
      biggerImage: ['']
    })
  }

  onSubmit(){
    this.createSubevent();
  }

  createSubevent() {
      this.subeventService.postSubevent(this.eventId, this.form.value)
        .pipe(first())
        .subscribe(
          subeventDto => console.log(subeventDto)
        );
  }

}
