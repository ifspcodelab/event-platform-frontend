import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit {
  @Input()
  title: string = '';
  @Input()
  description: string = '';
  @Input()
  secondDescription: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
