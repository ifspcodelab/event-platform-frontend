import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-header',
  templateUrl: './event-header.component.html',
  styleUrls: ['./event-header.component.scss']
})
export class EventHeaderComponent implements OnInit {
  @Input()
  url: string = "";
  @Input()
  urlText: string = "";
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

  openMenu() {
    let menu = document.querySelector(".header-content__menu")  as HTMLElement;
    menu.style.display === "flex" ? menu.style.display = 'none' : menu.style.display = "flex";
  }

}
