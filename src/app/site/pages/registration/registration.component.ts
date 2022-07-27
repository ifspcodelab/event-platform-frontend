import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistrationService } from 'src/app/core/services/registration.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup = this.buildForm();

  constructor(
    private registrationService: RegistrationService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(256)]],
      email: [null],
      cpf: [null],
      password: [null],
      agreed: [null]
    });
  }

  get name() { return this.form.get('name')!; }

  field(path: string) {
    return this.form.get(path)!;
  }

  fieldErrors(path: string) {
    return this.field(path)?.errors;
  }

  onSubmit() {
    if(this.form.invalid) {
      return;
    }
    this.createAccount();
    console.log(this.form);
  }

  createAccount() {
    this.registrationService.postAccount(this.form.value)
      .pipe(first())
      .subscribe(
        accountDto => console.log(accountDto)
      );
  }
}


