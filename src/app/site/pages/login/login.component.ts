import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup = this.buildForm();

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  private buildForm() {
    return this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  onSubmit() {
    console.log("form has been submitted");
  }
}
