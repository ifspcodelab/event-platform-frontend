import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {PasswordResetService} from "../../../core/services/password-reset.service";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private service: PasswordResetService) {
    this.form = this.formBuilder.group({
      password: [null],
      confirmedPassword: [null]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {

    if(!(this.form.value['password'] === this.form.value['confirmedPassword'])){
      alert("As senhas devem ser iguais");
      this.eraseForm();
    }else {
      this.prepareForm();
      this.service.sendPasswordAndToken(this.form.value).subscribe();
      this.eraseForm();
      alert("Sua senha foi alterada.")
    }
  }

  eraseForm() {
    this.form = this.formBuilder.group({
      password: [null],
      confirmedPassword: [null]
    });
  }

  getTokenValueFromURL(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('token');
  }

  prepareForm(){
    this.form.removeControl('confirmedPassword');
    this.form.value['token'] = this.getTokenValueFromURL();
  }

}

