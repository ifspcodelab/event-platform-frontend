import {Component, OnInit, Renderer2} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "../../../core/services/notification.service";
import {JwtService} from "../../../core/services/jwtservice.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ProblemDetail} from "../../../core/models/problem-detail";
import {AppValidators} from "../../../core/validators/app-validator";
import {AccountDeletionModel} from "../../../core/models/account-deletion.model";
import {AccountDeletionService} from "../../../core/services/account-deletion.service";

@Component({
  selector: 'app-account-deletion',
  templateUrl: './account-deletion.component.html',
  styleUrls: ['./account-deletion.component.scss']
})
export class AccountDeletionComponent implements OnInit {

  submitted: boolean = false;
  userRecaptcha: string | undefined;
  form: FormGroup;
  hideCurrent: boolean = true;
  hideNew: boolean = true;
  recaptchaSiteKey: string = environment.recaptchaSiteKey;
  requestLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: AccountDeletionService,
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private router: Router,
    private notificationService: NotificationService,
    private jwtService: JwtService,
  ) {
    this.form = this.buildForm();
    this.userRecaptcha = '';
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid || this.userRecaptcha == '') {
      return;
    }
    if(!this.matches()){
      this.notificationService.error("As senhas devem ser iguais.");
      this.refresh();
      this.form.reset();
      return;
    }

    const accountDeletionDto = new AccountDeletionModel(this.form.value['password'], this.userRecaptcha!);

    this.requestLoading = true;

    this.service.sendAccountDeletionRequest(accountDeletionDto).subscribe(()=>{
        this.notificationService.success("Sua solicitação foi enviada ao administrador. Em breve ele entrará em contato para finalizar o processo.")
        this.jwtService.removeAccessToken();
        this.jwtService.removeRefreshToken();
        this.router.navigateByUrl("/login");
        this.form.reset();
        this.submitted = false;
        this.requestLoading = false;
      },
      error => {
        this.handleError(error);
        this.form.reset();
        this.submitted = false;
        this.requestLoading = false;
      });
  }

  handleError(error: any) {
    this.requestLoading = false;
    this.refresh();
    if(error instanceof HttpErrorResponse) {
      const problem: ProblemDetail = error.error;
      if (problem.title == "Token not valid"){
        this.notificationService.error("Algo de errado com a requisição. Utilize apenas o link válido");
      }
      if (problem.title == "Password invalid"){
        this.notificationService.error("A senha inserida é inválida");
      }
      if (problem.title == "Invalid recaptcha"){
        this.notificationService.error("Recaptcha inválido. Atualize e tente novamente");
      }
    }
  }

  field(path: string) {
    return this.form.get(path)!;
  }

  fieldErrors(path: string) {
    return this.field(path)?.errors;
  }

  buildForm(): FormGroup{
    return this.form = this.fb.group({
      password: ["", [ Validators.required ]],
      confirmPassword: ["",
        [ Validators.required,
          Validators.minLength(8),
          Validators.maxLength(64),
          AppValidators.validPassword()]]
    });
  }

  resolved(captchaResponse: string): void {
    this.userRecaptcha = captchaResponse;
  }

  refresh(): void {
    grecaptcha.reset();
  }

  matches(){
    console.log(this.form.value['password'] == this.form.value['confirmPassword'])
    return(this.form.value['password'] == this.form.value['confirmPassword']);
  }
}
