import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { JwtService } from "../../../core/services/jwtservice.service";
import { MyDataService } from "../../../core/services/my-data.service";
import { AccountDto } from "../../../core/models/account.model";
import { first } from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {AccountDeletionDialogComponent} from "../account-deletion/dialog/account-deletion-dialog";
import { LogDto } from "../../../core/models/log.model";
import {MatTableDataSource} from "@angular/material/table";
import {PageDto} from "../../../core/models/page.model";
import {MatPaginatorIntl} from "@angular/material/paginator";
import {LoaderService} from "../../../admin/loader.service";

@Component({
  selector: 'app-my-data',
  templateUrl: './my-data.component.html',
  styleUrls: ['./my-data.component.scss']
})
export class MyDataComponent implements OnInit {
  accountDto: AccountDto;
  logsDto: LogDto[] = [];
  dataSource: MatTableDataSource<LogDto>;
  page: PageDto<LogDto>;
  displayedColumns: string[] = ['createdAt', 'resourceData'];

  constructor(
    private loaderService: LoaderService,
    private router: Router,
    private jwtService: JwtService,
    private myDataService: MyDataService,
    private dialog: MatDialog,
    private _MatPaginatorIntl: MatPaginatorIntl,
  ) { }

  ngOnInit(): void {
    this.loaderService.show();
    this.fetchLogs(0);

    this._MatPaginatorIntl.firstPageLabel = 'Primeira página';
    this._MatPaginatorIntl.itemsPerPageLabel = 'Usuários por página';
    this._MatPaginatorIntl.lastPageLabel = 'Última página';
    this._MatPaginatorIntl.nextPageLabel = 'Próxima página';
    this._MatPaginatorIntl.previousPageLabel = 'Página anterior';
  }

  editMyData() {
    this.router.navigate(['meus-dados', 'editar']);
  }

  fetchLogs(page: number) {
    this.myDataService.getAccount()
      .pipe(first())
      .subscribe({
        next: accountDto => {
          this.accountDto = accountDto;
          this.myDataService.getLogs(page)
            .pipe(first())
            .subscribe({
              next: pageDto => {
                this.page = pageDto;
                this.logsDto = this.page.content;
                this.dataSource = new MatTableDataSource<LogDto>(this.logsDto);
                this.loaderService.hide();
              },
            });
        }
      });
  }

  openDialog() {
    this.dialog.open(AccountDeletionDialogComponent);
  }
}
