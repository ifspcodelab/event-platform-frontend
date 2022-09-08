import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { JwtService } from "../../../core/services/jwtservice.service";
import { MyDataService } from "../../../core/services/my-data.service";
import { AccountDto } from "../../../core/models/account.model";
import { first } from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {AccountDeletionDialogComponent} from "../account-deletion/dialog/account-deletion-dialog";
import { LogDto } from "../../../core/models/log.model";

@Component({
  selector: 'app-my-data',
  templateUrl: './my-data.component.html',
  styleUrls: ['./my-data.component.scss']
})
export class MyDataComponent implements OnInit {
  accountDto: AccountDto;
  dataSource: LogDto[];
  displayedColumns: string[] = ['createdAt', 'resourceData'];

  constructor(
    private router: Router,
    private jwtService: JwtService,
    private myDataService: MyDataService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.fetchAccount();
  }

  editMyData() {
    this.router.navigate(['meus-dados', 'editar']);
  }

  fetchAccount() {
    this.myDataService.getAccount()
      .pipe(first())
      .subscribe({
        next: accountDto => {
          this.accountDto = accountDto;
          this.myDataService.getLogs()
            .pipe(first())
            .subscribe({
              next: logs => {
                this.dataSource = logs;
              },
            });
        }
      });
  }

  get accountDtoName() {
    return (this.accountDto && this.accountDto.name) ? this.accountDto.name : null;
  }

  get accountDtoEmail() {
    return (this.accountDto && this.accountDto.email) ? this.accountDto.email : null;
  }

  get accountDtoCpf() {
    return (this.accountDto && this.accountDto.cpf) ? this.accountDto.cpf : null;
  }

  openDialog() {
    this.dialog.open(AccountDeletionDialogComponent);
  }
}
