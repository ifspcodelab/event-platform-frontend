import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from 'src/app/core/services/registration.service';
import { first } from 'rxjs';
import { AppValidators } from 'src/app/core/validators/app-validator';
import { AccountCreateDto } from "../../../core/models/account.model";
import { Router } from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup = this.buildForm();
  userReCaptcha: string | undefined = '';
  hide: boolean = true;

  constructor(
    private registrationService: RegistrationService,
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private router: Router,
  ) { }

  ngOnInit(): void {
    let script = this.renderer.createElement('script');
    script.defer = true;
    script.async = true;
    script.src = "https://www.google.com/recaptcha/api.js\n";
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
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64),
          AppValidators.validPassword()
        ]
      ],
      agreed: ['', [Validators.requiredTrue]]
    });
  }

  field(path: string) {
    return this.form.get(path)!;
  }

  fieldErrors(path: string) {
    return this.field(path)?.errors;
  }

  onSubmit(): void {
    if (this.form.invalid || this.userReCaptcha == '') {
      return;
    }
    this.createAccount();
  }

  createAccount(): void {
    const accountCreateDto =
      new AccountCreateDto(
        this.form.value['name'],
        this.form.value['email'],
        this.form.value['cpf'],
        this.form.value['password'],
        this.form.value['agreed'],
        this.userReCaptcha
      )
    this.registrationService.postAccount(accountCreateDto)
      .pipe(first())
      .subscribe( {
        next: () => {
        alert("Seu cadastro foi realizado com sucesso");
        this.router.navigate(['login']);
        }
      });
  }

  resolved(captchaResponse: string): void {
    this.userReCaptcha = captchaResponse;
  }
}


