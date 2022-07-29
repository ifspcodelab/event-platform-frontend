import { SubeventDto } from './../../../../core/models/subevent.model';
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
  subeventDto: SubeventDto;
  subeventId: string;
  createMode: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private subeventService: SubeventService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    this.subeventId = this.route.snapshot.paramMap.get('subeventId');

    if(this.subeventId) {
      this.createMode = false;
      this.fetchSubevent();
    } else{
      this.createMode = true;
    }
  }

  fetchSubevent() {
    this.subeventService.getSubeventById(this.eventId, this.subeventId)
      .pipe(first())
      .subscribe(
        subeventDto => {
          this.subeventDto = subeventDto;
          this.form.patchValue(subeventDto);
        }
      )
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

    if(this.createMode) {
      this.createSubevent();
    }

    else {
      this.updateSubevent();
    }
  }

  createSubevent() {
      this.subeventService.postSubevent(this.eventId, this.form.value)
        .pipe(first())
        .subscribe(
          subeventDto => {
            if(subeventDto) {
              this.router.navigate(['admin', 'events', this.eventId, 'sub-events', subeventDto.id]);
              console.log(subeventDto)
            }
          },
          error => this.handleError(error)
        );
  }

  updateSubevent() {
    this.subeventService.putSubevent(this.eventId, this.form.value, this.subeventId)
        .pipe(first())
        .subscribe(
          subeventDto => {
            if(subeventDto) {
              this.router.navigate(['admin', 'events', this.eventId, 'sub-events', subeventDto.id]);
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

  getBackUrl() {
    if(this.createMode) {
      this.router.navigate(['admin', 'events', this.eventId]);
    } else {
      this.router.navigate(['admin', 'events', this.eventId, 'sub-events', this.subeventId]);
    }
  }

}
