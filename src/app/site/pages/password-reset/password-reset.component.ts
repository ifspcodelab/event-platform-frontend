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


  constructor(private formBuilder: FormBuilder,
              private service: PasswordResetService,
              private route: ActivatedRoute) {
    this.form = this.formBuilder.group({
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required,
                            Validators.minLength(8),
                            Validators.maxLength(64),]
    });
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

  get password(){
    return this.form.get('password');
  }

  get confirmPassword(){
    return this.form.get('confirmPassword')
  }
}

