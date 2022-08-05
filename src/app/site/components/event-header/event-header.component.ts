import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-header',
  templateUrl: './event-header.component.html',
  styleUrls: ['./event-header.component.scss']
})
export class EventHeaderComponent implements OnInit {
  @Input()
  image: string = "";
  @Input()
  title: string = "";
  @Input()
  startDate: string = "";
  @Input()
  endDate: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
