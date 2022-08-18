import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { environment } from "../../../../environments/environment";
import { AlterMyDataPasswordService } from "../../../core/services/alter-my-data-password.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NotificationService } from "../../../core/services/notification.service";
import { AppValidators } from "../../../core/validators/app-validator";

@Component({
  selector: 'app-erase-my-account',
  templateUrl: './erase-my-account.component.html',
  styleUrls: ['./erase-my-account.component.scss']
})
export class EraseMyAccountComponent implements OnInit {
  submitted: boolean = false;
  userRecaptcha: string | undefined;
  form: FormGroup;
  hide: boolean = true;
  recaptchaSiteKey: string = environment.recaptchaSiteKey;
  requestLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: AlterMyDataPasswordService,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private router: Router,
    private notificationService: NotificationService,
  ) {
    this.form = this.buildForm();
    this.userRecaptcha = '';
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid || this.userRecaptcha == '') {
      return;
    }

  }

  field(path: string) {
    return this.form.get(path)!;
  }

  fieldErrors(path: string) {
    return this.field(path)?.errors;
  }

  buildForm(): FormGroup{
    return this.form = this.fb.group({
      password: ["",
        [ Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64),
          AppValidators.validPassword()]]
    });
  }

  resolved(captchaResponse: string): void {
    this.userRecaptcha = captchaResponse;
  }
}
