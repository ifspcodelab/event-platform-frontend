import { Component, OnInit } from "@angular/core";
import { LoaderService } from "../../../admin/loader.service";
import { EventDto } from "../../../core/models/event.model";
import { ActivatedRoute, Router } from "@angular/router";
import { EventService } from "../../../core/services/event.service";
import { NotificationService } from "../../../core/services/notification.service";
import { MatTableDataSource } from "@angular/material/table";
import { SubeventService } from "../../../core/services/subevent.service";
import { SubeventDto } from "../../../core/models/subevent.model";
import { HttpErrorResponse } from "@angular/common/http";
import { AccountDto } from "../../../core/models/account.model";
import { first } from "rxjs";

@Component({
  selector: 'app-event-show',
  templateUrl: './event-show.component.html',
  styleUrls: ['./event-show.component.scss']
})
export class EventShowComponent implements OnInit {
  eventDto: EventDto;
  eventId: string;
  displayedColumns: string[] = ['title', 'status', 'startDate', 'endDate'];
  subeventsDto: SubeventDto[] = [];
  dataSource: MatTableDataSource<SubeventDto>;
  accountDto: AccountDto;

  constructor(
    private eventService: EventService,
    private subeventService: SubeventService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    private loaderService: LoaderService,
  ) { }

  ngOnInit(): void {
    this.loaderService.show()
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    this.fetchEvent(this.eventId);
  }

  fetchEvent(eventId: string) {
    this.eventService.getEventById(eventId)
      .pipe(first())
      .subscribe(eventDto => {
          this.eventDto = eventDto;
          this.fetchSubevents(this.eventId);
          this.loaderService.hide();
        }
      );
  }

  fetchSubevents(eventId: string) {
    this.subeventService.getSubevents(eventId)
      .subscribe(subevents => {
        this.subeventsDto = subevents;
        this.dataSource = new MatTableDataSource<SubeventDto>(this.subeventsDto);
        this.loaderService.hide();
      });
  }

  openEventAndSubeventList() {
    return this.router.navigate(['organizer']);
  }

  openSubeventShow(subeventDto: SubeventDto) {
    return this.router.navigate(['organizer', 'sub-events', subeventDto.id, 'sessions']);
  }

  handleError(error: any) {
    if(error instanceof HttpErrorResponse) {
      if(error.status === 409) {
        this.notificationService.error(error.error.violations[0].message);
      }
    }
  }
}
