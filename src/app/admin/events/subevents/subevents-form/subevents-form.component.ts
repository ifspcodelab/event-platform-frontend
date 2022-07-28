import { NotificationService } from './../../../../core/services/notification.service';
import { ProblemDetail } from './../../../../core/models/problem-detail';
import { AppValidators } from 'src/app/core/validators/app-validator';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SubeventService} from "../../../../core/services/subevent.service";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {Violation} from "../../../../core/models/problem-detail";

@Component({
  selector: 'app-subevents-form',
  templateUrl: './subevents-form.component.html',
  styleUrls: ['./subevents-form.component.scss']
})
export class SubeventsFormComponent implements OnInit {
  form: FormGroup = this.buildForm();
  eventId: string;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private subeventService: SubeventService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId');
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      title: ['', [Validators.required, AppValidators.notBlank, Validators.minLength(3), Validators.maxLength(50)]],
      slug: ['', [Validators.required, AppValidators.notBlank]],
      summary: ['', [Validators.required, AppValidators.notBlank, Validators.minLength(100), Validators.maxLength(150)]],
      presentation: ['', [Validators.required, AppValidators.notBlank, Validators.minLength(1000), Validators.maxLength(5000)]],
      executionPeriod: this.formBuilder.group({
        startDate: ['', [Validators.required]],
        endDate: ['',[Validators.required]]
      }),
      smallerImage: [''],
      biggerImage: ['']
    })
  }

  onSubmit(){
    this.submitted = true;
    if(this.form.invalid) {
      return;
    }
    this.createSubevent();
  }

  createSubevent() {
      this.subeventService.postSubevent(this.eventId, this.form.value)
        .pipe(first())
        .subscribe(
          subeventDto => {
            if(subeventDto) {
              this.router.navigate(['admin', 'events', this.eventId, 'sub-events',subeventDto.id]);
              console.log(subeventDto)
            }
          },
          error => this.handleError(error)
        );
  }

  fieldErrors(path: string) {
    return this.field(path)?.errors;
  }

  field(path: string) {
    return this.form.get(path)!;
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

      if(error.status == 409) {
        const problem: ProblemDetail = error.error;
        this.notificationService.error(problem.violations[0].message);
      }


    }
  }

}
