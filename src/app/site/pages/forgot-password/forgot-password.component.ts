import {Component, OnInit} from '@angular/core';
import {Form, FormBuilder, FormGroup} from "@angular/forms";
import {PasswordResetService} from "../../../core/services/password-reset.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private service: PasswordResetService) {
    this.form = this.formBuilder.group({
      email: [null]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.service.sendResetPasswordRequest(this.form.value).subscribe();
    this.eraseForm();
    alert("Um link para recuperação sera enviado no email informado.")
  }

  eraseForm() {
    this.form = this.formBuilder.group({
      email: [null]
    });
  }
}
