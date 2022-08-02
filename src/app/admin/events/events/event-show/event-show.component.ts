import { Component, OnInit } from '@angular/core';
import { EventDto } from "../../../../core/models/event.model";
import { EventService } from "../../../../core/services/event.service";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs";
import { SubeventDto } from "../../../../core/models/subevent.model";
import { SubeventService } from "../../../../core/services/subevent.service";
import { NotificationService } from "../../../../core/services/notification.service";
import { ConfirmationDialogComponent } from "../../../../core/components/confirmation-dialog/confirmation-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { HttpErrorResponse } from "@angular/common/http";
import { ActivityService } from "../../../../core/services/activity.service";
import { ActivityDto } from "../../../../core/models/activity.model";

@Component({
  selector: 'app-event-show',
  templateUrl: './event-show.component.html',
  styleUrls: ['./event-show.component.scss']
})
export class EventShowComponent implements OnInit {
  displayedColumns: string[] = ['title', 'status', 'startDate', 'endDate'];
  subeventsDto: SubeventDto[] = [];

  activitiesDto: ActivityDto[] = [];
  activitiesDisplayedColumns: string[] = ['title', 'online', 'registrationRequired', 'status'];

  tabSelectedIndex: number = 2;

  eventDto: EventDto;
  eventId: string;

  constructor(
    private eventService: EventService,
    private subeventService: SubeventService,
    private activityService: ActivityService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    this.fetchEvent(this.eventId);
  }

  fetchEvent(eventId: string) {
    this.eventService.getEventById(eventId)
      .pipe(first())
      .subscribe(
        eventDto => {
          this.eventDto = eventDto;
          this.fetchSubevents(this.eventId);
          this.fetchActivities(this.eventId);
        }
      );
  }

  fetchSubevents(eventId: string) {
    this.subeventService.getSubevents(eventId)
      .subscribe(subevents => this.subeventsDto = subevents);
  }

  fetchActivities(eventId: string) {
    this.activityService.getActivities(eventId)
      .subscribe(activities => {
        this.activitiesDto = activities
        this.setTabSelectedIndex();
      });
  }

  setTabSelectedIndex() {
    this.route.queryParams.subscribe(params => this.tabSelectedIndex = params['tab']);
  }

  openEventList() {
    return this.router.navigate(['admin', 'events']);
  }

  openActivityShow(activityDto: ActivityDto) {
    return this.router.navigate(['admin', 'events', this.eventDto.id, 'activities', activityDto.id]);
  }

  publishEvent() {
    this.eventService.publishEvent(this.eventId)
      .pipe(first())
      .subscribe({
        next: eventDto => {
          this.eventDto = eventDto;
          this.notificationService.success("Evento publicado com sucesso");
        },
        error: error => this.handleError(error)
      });
  }

  unpublishEvent() {
    this.eventService.unpublishEvent(this.eventId)
      .pipe(first())
      .subscribe({
        next: eventDto => {
          this.eventDto = eventDto;
          this.notificationService.success("Evento despublicado com sucesso");
        },
        error: error => this.handleError(error)
      });
  }

  cancelEvent() {
    this.eventService.cancelEvent(this.eventId)
      .pipe(first())
      .subscribe({
        next: eventDto => {
          this.eventDto = eventDto;
          this.notificationService.success("Evento cancelado com sucesso");
        },
        error: error => this.handleError(error)
      });
  }

  openSubeventShow(subeventDto: SubeventDto) {
    return this.router.navigate(['admin', 'events', this.eventDto.id, 'sub-events', subeventDto.id]);
  }

  private getConfirmationDialogConfig() {
    return {
      autoFocus: true,
      data: {
        name: "Excluir evento",
        text: `O evento ${this.eventDto.title} será excluido de forma definitiva.`,
        cancelText: "Cancelar",
        okText: "Excluir"
      }
    }
  }

  openDeleteConfirmationDialog() {
    this.dialog.open(ConfirmationDialogComponent, this.getConfirmationDialogConfig()).afterClosed()
      .subscribe( result => {
        if (result) {
          this.deleteEvent();
        }
      });
  }

  deleteEvent() {
    this.eventService.deleteEvent(this.eventId)
      .pipe(first())
      .subscribe({
        next: () => {
          this.notificationService.success("Excluido com sucesso");
          this.router.navigate(['admin', 'events'])
        },
        error: error => this.handleError(error)
      });
  }

  handleError(error: any) {
    if(error instanceof HttpErrorResponse) {
      if(error.status === 409) {
        this.notificationService.error(error.error.violations[0].message);
      }
    }
  }
}
