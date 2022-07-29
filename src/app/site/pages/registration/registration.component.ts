import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistrationService } from 'src/app/core/services/registration.service';
import { first } from 'rxjs';
import { AppValidators } from 'src/app/core/validators/app-validator';

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
    console.log(''); // to stop alerting
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(256),
          AppValidators.validName()
        ],
      ],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(350)]],
      cpf: ['', [Validators.required, AppValidators.validCpf()]],
      password: ['',
        [Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64),
          AppValidators.validPassword()
        ]
      ],
      agreed: ['', [Validators.requiredTrue]]
    });
  }

  get name() { return this.form.get('name')!; }

  get email() { return this.form.get('email')!; }

  get cpf() { return this.form.get('cpf')!; }

  get password() { return this.form.get('password')!; }

  get agreed() { return this.form.get('agreed')!; }

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


