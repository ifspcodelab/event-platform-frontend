import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LoaderService} from "../../loader.service";
import {NotificationService} from "../../../core/services/notification.service";
import {MatDialog} from "@angular/material/dialog";
import {first} from "rxjs";
import {ConfirmationDialogComponent} from "../../../core/components/confirmation-dialog/confirmation-dialog.component";
import {HttpErrorResponse} from "@angular/common/http";
import {ProblemDetail} from "../../../core/models/problem-detail";
import {AccountService} from "../../../core/services/account.service";
import {AccountDto} from "../../../core/models/account.model";
import {AccountRole} from "../../../core/models/account-role.model";

@Component({
  selector: 'app-account-show',
  templateUrl: './account-show.component.html',
  styleUrls: ['./account-show.component.scss']
})
export class AccountShowComponent implements OnInit {
  accountDto: AccountDto;
  accountId: string;

  constructor(
    protected accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router,
    private loaderService: LoaderService,
    private notificationService: NotificationService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loaderService.show()
    this.accountId = this.route.snapshot.paramMap.get('accountId');
    this.fetchAccount(this.accountId);
  }

  private fetchAccount(accountId: string) {
    this.accountService.getAccountById(accountId)
      .pipe(first())
      .subscribe({
        next: accountDto => {
          this.accountDto = accountDto;
          this.loaderService.hide();
        }
      })
  }

  backLink() {
    return this.router.navigate(['admin', 'accounts']);
  }

  private getConfirmationDialogConfig() {
    return {
      autoFocus: true,
      data: {
        name: "Excluir usuário",
        text: `O usuário ${this.accountDto.name} será excluido de forma definitiva.`,
        cancelText: "Cancelar",
        okText: "Excluir"
      }
    };
  }

  openDeleteConfirmationDialog() {
    this.dialog.open(ConfirmationDialogComponent, this.getConfirmationDialogConfig())
      .afterClosed()
      .subscribe({
        next: result => {
          if (result) {
            this.deleteAccount();
          }
        }
      });
  }

  deleteAccount() {
    this.accountService.deleteAccount(this.accountId)
      .pipe(first())
      .subscribe({
        next: () => {
          this.notificationService.success("Usuário excluído com sucesso");
          return this.router.navigate(['admin', 'accounts'])
        },
        error: (error: any) => this.handleError(error)
      });
  }

  handleError(error: any) {
    if(error instanceof HttpErrorResponse) {
      if(error.status === 409) {
        const problem: ProblemDetail = error.error;
        this.notificationService.error(problem.violations[0].message);
      }
    }
  }
}
