import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from "@angular/material/sort";
import { LoaderService } from "../../../../admin/loader.service";
import { EventDto } from "../../../../core/models/event.model";
import { Router } from "@angular/router";
import { EventService } from "../../../../core/services/event.service";
import { MatTableDataSource } from "@angular/material/table";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { OrganizerAreaService } from "../../../../core/services/organizer-area.service";

@Component({
  selector: 'app-event-and-subevent-list',
  templateUrl: './event-and-subevent-list.component.html',
  styleUrls: ['./event-and-subevent-list.component.scss']
})
export class EventAndSubeventListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'status', 'startDate', 'endDate'];
  eventsDto: EventDto[] = [];
  dataSource: MatTableDataSource<EventDto>;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(
    private eventService: EventService,
    private organizerAreaService: OrganizerAreaService,
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

    this.organizerAreaService.getEvents()
  }

  openEventShow(eventDto: EventDto) {
    return this.router.navigate(['organizer', 'events', eventDto.id]);
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

