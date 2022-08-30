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
  requestLoading: boolean;

  constructor(
    private route: ActivatedRoute,
    private service: AccountService,
    private router: Router,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
    this.requestLoading = true;
    this.service.accountDeletionConfirmation(this.token).subscribe(()=>{
        this.notificationService.success("Um email foi enviado ao administrador do sistema que logo entrará em contato com você para prosseguir com o processo.")
        this.requestLoading = false;
      },
      error => {
        this.handleError(error);
        this.requestLoading = false;
      });
  }

  handleError(error: any) {
    if(error instanceof HttpErrorResponse) {
      const problem: ProblemDetail = error.error;
      console.log(error.error);
      if (problem.title == "Account deletion token expired"){
        this.notificationService.error("Tempo do link expirado, solicite a exclusão novamente.");
      }
      if (problem.title == "Resource not found exception"){
        this.notificationService.error("Nenhuma solicitação de exclusão de conta encontrada");
      }
    }
  }

  getBack() {
    this.router.navigateByUrl("/login");
  }
}
