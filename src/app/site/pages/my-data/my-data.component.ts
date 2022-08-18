import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { JwtService } from "../../../core/services/jwtservice.service";
import { MyDataService } from "../../../core/services/my-data.service";
import { AccountDto } from "../../../core/models/account.model";
import { first } from "rxjs";

@Component({
  selector: 'app-my-data',
  templateUrl: './my-data.component.html',
  styleUrls: ['./my-data.component.scss']
})
export class MyDataComponent implements OnInit {
  accountDto: AccountDto;

  constructor(
    private router: Router,
    private jwtService: JwtService,
    private myDataService: MyDataService,
  ) { }

  ngOnInit(): void {
    this.fetchAccount();
  }

  editMyData() {
    this.router.navigate(['meus-dados', 'edicao']);
  }

  fetchAccount() {
    this.myDataService.getAccount()
      .pipe(first())
      .subscribe(
      accountDto => {
        this.accountDto = accountDto
      }
    );
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
}
