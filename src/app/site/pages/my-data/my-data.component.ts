import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { JwtService } from "../../../core/services/jwtservice.service";
import { AccessTokenData } from "../../../core/models/access-token-data.model";
import { MyDataService } from "../../../core/services/my-data.service";

@Component({
  selector: 'app-my-data',
  templateUrl: './my-data.component.html',
  styleUrls: ['./my-data.component.scss']
})
export class MyDataComponent implements OnInit {
  currentUser: { name: string; cpf: string; email: string } = {name: "Marcelo da Silva", email: "marcelo01@email.com", cpf: "123441251"};
  accessToken: string = this.jwtService.getAccessToken();
  accessTokenData: AccessTokenData = this.jwtService.decodeAccessToken(this.accessToken) as AccessTokenData;
  // console.log(accessTokenData: any);
  // email: string = this.accessTokenData.email;
  // cpf: string = this.accessTokenData.cpf;
  // account = this.myDataService.getAccount(this.accessTokenData.id);
  // currentUser: { name: string; cpf: string; email: string } = {name: "Marcelo da Silva", cpf: this.cpf,email: this.email};

  constructor(
    private router: Router,
    private jwtService: JwtService,
    private myDataService: MyDataService,
  ) { }

  ngOnInit(): void {
    console.log(this.accessToken);
    console.log(this.accessTokenData);
    // console.log(this.accessTokenData.keys);
  }

  editMyData() {
    this.router.navigate(['meus-dados', 'edicao']);
  }
}
