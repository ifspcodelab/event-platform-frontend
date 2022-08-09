import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppValidators } from "../../../core/validators/app-validator";
import { AccountCreateDto } from "../../../core/models/account.model";
import { first } from "rxjs";

@Component({
  selector: 'app-my-data-edit',
  templateUrl: './my-data-edit.component.html',
  styleUrls: ['./my-data-edit.component.scss']
})
export class MyDataEditComponent implements OnInit {
  form: FormGroup = this.buildForm();
  userReCaptcha: string | undefined = '';

  constructor(
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
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
    this.updateAccount();
  }

  private updateAccount() {
    // TODO: precisa pegar o que tem no token de acesso e mandar a requisicao patch para
    // TODO: o backend fazer o update do account
  }
}
