import {Component, OnInit, Renderer2} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistrationService } from 'src/app/core/services/registration.service';
import { first } from 'rxjs';
import { AppValidators } from 'src/app/core/validators/app-validator';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup = this.buildForm();

  constructor(
    private registrationService: RegistrationService,
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    let script = this.renderer.createElement('script');
    script.defer = true;
    script.async = true;
    script.src="https://www.google.com/recaptcha/api.js\n";
    this.renderer.appendChild(document.body, script);
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


  resolved(token : any) {
    // send token to backend
    console.log(token);
    this.http.post('', {token: token}).subscribe(
      res => {
        console.log("success or not ? ", res);
      }
    );
  }
}


