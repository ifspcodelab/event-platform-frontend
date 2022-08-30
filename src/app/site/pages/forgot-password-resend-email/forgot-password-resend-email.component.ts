import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { NotificationService } from "../../../core/services/notification.service";
import { first, interval, Subscription } from "rxjs";
import { PasswordResetService } from "../../../core/services/password-reset.service";

@Component({
  selector: 'app-forgot-password-resend-email',
  templateUrl: './forgot-password-resend-email.component.html',
  styleUrls: ['./forgot-password-resend-email.component.scss']
})

export class ForgotPasswordResendEmailComponent implements OnInit {
  email: string;
  contact: string = "social.spo@ifsp.edu.br";
  passwordResetProblem: string = null;
  requestLoading: boolean = false;
  public intervalObserver$: Subscription;
  intervalUnit: number = 0;
  timeToSendEmail: number = 60;

  constructor(
    private passwordResetService: PasswordResetService,
    private router: Router,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.email = localStorage.getItem('email');
    this.intervalObserver$ = interval(1000)
    .subscribe((intervalUnit) => {
      this.intervalUnit = intervalUnit;
      if (intervalUnit > this.timeToSendEmail) {
        this.intervalObserver$.unsubscribe();
      }
    })
  }

  @HostListener('unloaded')
  public ngOnDestroy(): void {
    localStorage.removeItem('email');
    this.intervalObserver$.unsubscribe();
  }

  resendEmail(): void {
    if (this.timeToSendEmail - this.intervalUnit > 0) {
      this.passwordResetProblem = `Espere um minuto para reenviar o email`;
      this.sleep(5000).then(() => this.passwordResetProblem = null);
      return null;
    }
    this.requestLoading = true;

    this.passwordResetService.postEmail(this.email)
      .pipe(first())
      .subscribe({
        next: () => {
          this.notificationService.success("Email reenviado. Em caso de não ter recebido entre em contato com a comissão");
          this.requestLoading = false;
          this.email = null;
          localStorage.removeItem('email');
          this.router.navigate(['login']);
          this.intervalObserver$.unsubscribe();
        },
        error: () =>{
          this.intervalObserver$.unsubscribe();
        }
      }
      )
  }

  sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

