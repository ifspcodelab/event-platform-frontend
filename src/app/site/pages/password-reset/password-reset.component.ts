import {Component, EventEmitter, OnInit, Output, Renderer2} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PasswordResetService} from "../../../core/services/password-reset.service";
import {PasswordResetDto} from "../../../core/models/password-reset-dto";
import {ActivatedRoute, Router} from "@angular/router";
import {AppValidators} from "../../../core/validators/app-validators";


@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  submitted: boolean = false;
  userRecaptcha: string | undefined;
  token: string | null | undefined;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: PasswordResetService,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private router: Router,
  ) {
    this.form = this.buildForm();
    this.userRecaptcha = '';
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');

    let script = this.renderer.createElement('script');
    script.defer = true;
    script.async = true;
    script.src="https://www.google.com/recaptcha/api.js";
    this.renderer.appendChild(document.body, script);
  }

  onSubmit() {
    this.submitted = true;
    if(this.form.invalid || !this.matches() || this.userRecaptcha == ''){
      return;
    }
    const passwordResetDto = new PasswordResetDto(this.form.value['password'], this.token!, this.userRecaptcha!);
    this.service.sendPasswordAndToken(passwordResetDto).subscribe(()=>{
      alert("Sua senha foi alterada com sucesso");
        this.router.navigateByUrl("/esqueci-minha-senha");
        this.form.reset();
        this.submitted = false;
      },
      () => {
        alert("Requisição inválida");
        this.form.reset();
        this.submitted = false;
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
        [Validators.required, Validators.minLength(8), Validators.maxLength(64), AppValidators.validPassword()]],
      confirmPassword: ["",
        [Validators.required, Validators.minLength(8), Validators.maxLength(64), AppValidators.validPassword()]]
    });
  }

  resolved(captchaResponse: string): void {
    this.userRecaptcha = captchaResponse;
  }
}

