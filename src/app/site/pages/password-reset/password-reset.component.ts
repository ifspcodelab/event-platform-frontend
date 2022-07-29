import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PasswordResetService} from "../../../core/services/password-reset.service";
import {PasswordResetDto} from "../../../core/models/password-reset-dto";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  form: FormGroup;
  token: string | null | undefined;
  submitted: boolean = false;


  constructor(private fb: FormBuilder,
              private service: PasswordResetService,
              private route: ActivatedRoute) {
    this.form = this.buildForm();
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    console.log(this.token);
  }

  onSubmit() {
      this.submitted = true;
       if(this.form.invalid || !this.matches()){
           return;
       }
      const passwordResetDto = new PasswordResetDto(this.form.value['password'], this.token!);
      this.service.sendPasswordAndToken(passwordResetDto).subscribe(()=>{
        this.form.reset();
        this.submitted = false;
        alert("Sua senha foi alterada.")
      });
  }

  matches(){
    return this.form.value['password'] === this.form.value['confirmPassword'];
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
        [Validators.required, Validators.minLength(8), Validators.maxLength(64),]],
      confirmPassword: [""]
    });
  }
}

