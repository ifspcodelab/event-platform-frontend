import { SubeventDto } from './../../../../core/models/subevent.model';
import { NotificationService } from './../../../../core/services/notification.service';
import { ProblemDetail } from './../../../../core/models/problem-detail';
import { AppValidators } from 'src/app/core/validators/app-validator';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SubeventService } from "../../../../core/services/subevent.service";
import {ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { Violation } from "../../../../core/models/problem-detail";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { eventEditorConfig } from "../../../../core/configs/rich-text.config";

@Component({
  selector: 'app-subevents-form',
  templateUrl: './subevents-form.component.html',
  styleUrls: ['./subevents-form.component.scss']
})
export class SubeventsFormComponent implements OnInit {
  form: FormGroup;
  eventId: string;
  submitted: boolean = false;
  subeventDto: SubeventDto;
  subeventId: string;
  createMode: boolean;
  editorConfig: AngularEditorConfig = eventEditorConfig;

  constructor(
    private subeventService: SubeventService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = this.buildForm();
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
          this.form.get('executionPeriod.startDate').patchValue(new Date(this.subeventDto.executionPeriod.startDate.replace(/-/g, '/')));
          this.form.get('executionPeriod.endDate').patchValue(new Date(this.subeventDto.executionPeriod.endDate.replace(/-/g, '/')));
        }
      );
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      title: ['',
        [
          Validators.required,
          AppValidators.notBlank,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]
      ],
      slug: ['', [Validators.required, AppValidators.notBlank]],
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
      contact: ['', [Validators.required, AppValidators.notBlank, Validators.minLength(100), Validators.maxLength(5000)]],
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
    } else {
      this.updateSubevent();
    }
  }

  createSubevent() {
      this.subeventService.postSubevent(this.eventId, this.form.value)
        .pipe(first())
        .subscribe({
          next: subeventDto => {
              this.notificationService.success('Subevento cadastrado com sucesso');
              this.router.navigate(['admin', 'events', this.eventId, 'sub-events', subeventDto.id]);
          },
          error:  error => this.handleError(error)
        });
  }

  updateSubevent() {
    this.subeventService.putSubevent(this.eventId, this.form.value, this.subeventId)
        .pipe(first())
        .subscribe({
          next: subeventDto => {
            this.notificationService.success('Subevento editado com sucesso');
            this.router.navigate(['admin', 'events', this.eventId, 'sub-events', subeventDto.id]);
          },
          error: error => this.handleError(error)
        });
  }

  getBackUrl() {
    if(this.createMode) {
      this.router.navigate(['admin', 'events', this.eventId]);
    } else {
      this.router.navigate(['admin', 'events', this.eventId, 'sub-events', this.subeventId]);
    }
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
          // Depois será melhorado
          const violation = problem.violations[0];
          if(violation.message.includes("title")) {
            this.form.get("title").setErrors({ serverError: 'Já existe um subevento com esse título' });
          }
          if(violation.message.includes("slug")) {
            this.form.get("slug").setErrors({ serverError: 'Já existe um subevento com esse slug' });
          }
        } else {
          this.notificationService.error(problem.violations[0].message);
        }
      }
    }
  }

  fieldErrors(path: string) {
    return this.field(path)?.errors;
  }

  field(path: string) {
    return this.form.get(path)!;
  }
}
