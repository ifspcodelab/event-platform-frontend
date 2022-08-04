import { Component, OnInit, ViewChild } from '@angular/core';
import { EventDto } from "../../../../core/models/event.model";
import { EventService } from "../../../../core/services/event.service";
import { Router } from "@angular/router";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from "@angular/material/sort";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { LoaderService } from "../../../loader.service";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'status', 'startDate', 'endDate'];
  eventsDto: EventDto[] = [];
  dataSource: MatTableDataSource<EventDto>;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(
    private eventService: EventService,
    private router: Router,
    private loaderService: LoaderService,
    private _liveAnnouncer: LiveAnnouncer,
  ) { }

  ngOnInit(): void {
    this.loaderService.show()
    this.eventService.getEvents()
      .subscribe(events => {
        this.eventsDto = events
        this.dataSource = new MatTableDataSource<EventDto>(this.eventsDto);
        this.loaderService.hide();
      });
  }

  openEventShow(eventDto: EventDto) {
    return this.router.navigate(['admin', 'events', eventDto.id]);
  }

  announceSortChange(sort: Sort) {
    this.dataSource.sort = this.sort;

    if (sort.direction) {
      this._liveAnnouncer.announce(`Ordenado ${sort.direction}final`);
    } else {
      this._liveAnnouncer.announce('Ordenação removida');
    }
  }
}
