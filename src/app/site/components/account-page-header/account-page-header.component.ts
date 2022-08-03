import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: 'app-account-page-header',
  templateUrl: './account-page-header.component.html',
  styleUrls: ['./account-page-header.component.scss']
})

export class AccountPageHeaderComponent implements OnInit {
  @Input()
  title: string = '';
  @Input()
  description: string = '';
  @Input()
  secondDescription: string = '';

  constructor() { }

  ngOnInit(): void {}
}

