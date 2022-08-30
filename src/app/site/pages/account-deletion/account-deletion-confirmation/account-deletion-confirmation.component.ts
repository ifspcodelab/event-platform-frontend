import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../../../../core/services/account.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ProblemDetail} from "../../../../core/models/problem-detail";
import {NotificationService} from "../../../../core/services/notification.service";

@Component({
  selector: 'app-account-deletion-confirmation',
  templateUrl: './account-deletion-confirmation.component.html',
  styleUrls: ['./account-deletion-confirmation.component.scss']
})
export class AccountDeletionConfirmationComponent implements OnInit {
  token: string | null | undefined;

  constructor(
    private route: ActivatedRoute,
    private service: AccountService,
    private router: Router,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    this.service.accountDeletionConfirmation(this.token).subscribe(()=>{
        this.notificationService.success("Um email foi enviado ao administrador do sistema que logo entrará em contato com você para prosseguir com o processo.")
        this.router.navigateByUrl("/login");
      },
      error => {
        this.handleError(error);
        this.router.navigateByUrl("/login");
      });
  }

  handleError(error: any) {
    if(error instanceof HttpErrorResponse) {
      const problem: ProblemDetail = error.error;
      if (problem.title == "Account deletion token expired"){
        this.notificationService.error("Tempo do link expirado, solicite a exclusão novamente.");
      }
    }
  }

}
