import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SpeakerDto } from "../../../core/models/speaker.model";
import { SpeakerService } from "../../../core/services/speaker.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NotificationService } from "../../../core/services/notification.service";
import { AppValidators } from "../../../core/validators/app-validator";
import { first } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { ProblemDetail, Violation } from "../../../core/models/problem-detail";

@Component({
  selector: 'app-speaker-form',
  templateUrl: './speaker-form.component.html',
  styleUrls: ['./speaker-form.component.scss']
})
export class SpeakerFormComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;
  createMode: boolean;
  speakerId: string;
  speakerDto: SpeakerDto;

  constructor(
    private speakerService: SpeakerService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.form = this.buildForm();
    this.speakerId = this.route.snapshot.paramMap.get('speakerId');

    if(this.speakerId) {
      this.createMode = false;
      this.fetchSpeaker();
    } else {
      this.createMode = true;
    }
  }

  fetchSpeaker() {
    this.speakerService.getSpeakerById(this.speakerId)
      .pipe(first())
      .subscribe(
        speakerDto => {
          this.speakerDto = speakerDto;
          this.form.patchValue(this.speakerDto);
        }
      )
  }

  private buildForm() {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256), AppValidators.notBlank, AppValidators.validName]],
      cpf: ['', [Validators.required, AppValidators.validCpf]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(350)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15), AppValidators.notBlank]],
      curriculum: ['', [Validators.required, Validators.minLength(150), Validators.maxLength(300), AppValidators.notBlank]],
      lattes: ['', []],
      linkedin: ['', []],
      accountId: ['', []],
    });
  }

  onSubmit() {
    this.submitted = true;

    if(this.form.invalid) {
      return;
    }

    if(this.createMode) {
      this.createSpeaker();
    } else {
      this.updateSpeaker();
    }
  }

  private createSpeaker() {
    if(this.form) {
      this.speakerService.postSpeaker(this.form.value)
        .pipe(first())
        .subscribe({
          next: speakerDto => {
            this.notificationService.success("Ministrante cadastrado com sucesso");
            return this.router.navigate(['admin', 'speakers', speakerDto.id]);
          },
          error: error => this.handleError(error)
        });
    }
  }

  private updateSpeaker() {
    this.speakerService.putSpeaker(this.speakerId, this.form.value)
      .pipe(first())
      .subscribe({
        next: speakerDto => {
          this.notificationService.success("Ministrante atualizado com sucesso");
          return this.router.navigate(['admin', 'speakers', speakerDto.id]);
        },
        error: error => this.handleError(error)
      });
  }

  private handleError(error: any) {
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
          const violation = problem.violations[0];
          if(violation.message.includes("cpf")) {
            this.form.get("cpf").setErrors({ serverError: 'Já existe um ministrante com esse cpf' });
          }

          if(violation.message.includes("email")) {
            this.form.get("email").setErrors({ serverError: 'Já existe um ministrante com esse email' });
          }
        } else {
          this.notificationService.error(problem.violations[0].message);
        }
      }
    }
  }

  getBackUrl() {
    if(this.createMode) {
      return this.router.navigate(['admin', 'speakers']);
    } else {
      return this.router.navigate(['admin', 'speakers', this.speakerId]);
    }
  }

  field(path: string) {
    return this.form.get(path)!;
  }

  fieldErrors(path: string) {
    return this.field(path)?.errors;
  }
}
