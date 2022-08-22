import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-site-card',
  templateUrl: './site-card.component.html',
  styleUrls: ['./site-card.component.scss']
})
export class SiteCardComponent implements OnInit {
  @Input()
  image: string = "";
  @Input()
  title: string = "";
  @Input()
  startDate: string = "";
  @Input()
  endDate: string = "";
  @Input()
  summary: string = "";
  @Input()
  url: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
