import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { JwtService } from "../../../core/services/jwtservice.service";
import { MyDataService } from "../../../core/services/my-data.service";
import { AccountDto } from "../../../core/models/account.model";
import { first } from "rxjs";
import { LogDto } from "../../../core/models/log.model";

@Component({
  selector: 'app-my-data',
  templateUrl: './my-data.component.html',
  styleUrls: ['./my-data.component.scss']
})

export class MyDataComponent implements OnInit {
  accountDto: AccountDto;
  dataSource: LogDto[];
  displayedColumns: string[] = ['no', 'createdAt', 'resourceData'];

  constructor(
    private router: Router,
    private jwtService: JwtService,
    private myDataService: MyDataService,
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
}
