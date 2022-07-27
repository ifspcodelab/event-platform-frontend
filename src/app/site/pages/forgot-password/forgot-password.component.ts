import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PasswordResetService } from "../../../core/services/password-reset.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;
  submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: PasswordResetService
  ) {
    this.form = this.formBuilder.group({
      email: ["",[Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    if(this.form.invalid){
      return;
    }
    this.service.sendResetPasswordRequest(this.form.value).subscribe(()=>{

        this.form.reset();
        this.submitted = false;
        alert("Um link para recuperação sera enviado no email informado.")
      }
    );
  }

  get email(){
    return this.form.get('email')!;
  }

}
