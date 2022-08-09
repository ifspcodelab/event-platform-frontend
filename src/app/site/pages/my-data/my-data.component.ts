import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-my-data',
  templateUrl: './my-data.component.html',
  styleUrls: ['./my-data.component.scss']
})
export class MyDataComponent implements OnInit {
  currentUser: { name: string; cpf: string; email: string } = {name: "Marcelo da Silva", email: "marcelo01@email.com", cpf: "123441251"};

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  editMyData() {
    this.router.navigate(['meus-dados', 'edicao']);
  }
}
