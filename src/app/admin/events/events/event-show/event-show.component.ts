import { OrganizerService } from './../../../../core/services/organizer.service';
import { OrganizerDto } from './../../../../core/models/organizer.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CancellationMessageCreateDto, EventDto } from "../../../../core/models/event.model";
import { EventService } from "../../../../core/services/event.service";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs";
import { SubeventDto } from "../../../../core/models/subevent.model";
import { SubeventService } from "../../../../core/services/subevent.service";
import { NotificationService } from "../../../../core/services/notification.service";
import { ConfirmationDialogComponent } from "../../../../core/components/confirmation-dialog/confirmation-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { HttpErrorResponse } from "@angular/common/http";
import { CancelDialogComponent } from "../../../../core/components/cancel-dialog/cancel-dialog.component";
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { LoaderService } from "../../../loader.service";

@Component({
  selector: 'app-event-show',
  templateUrl: './event-show.component.html',
  styleUrls: ['./event-show.component.scss']
})
export class EventShowComponent implements OnInit {
  displayedColumns: string[] = ['title', 'status', 'startDate', 'endDate'];
  subeventsDto: SubeventDto[] = [];
  displayedColumnsOrganizer: string[] = ['name', 'email', 'type', 'action'];
  organizersDto: OrganizerDto[] = [];
  eventDto: EventDto;
  eventId: string;
  cancellationMessageCreateDto: CancellationMessageCreateDto;
  tabSelectedIndex: number = 0;
  dataSource: MatTableDataSource<SubeventDto>;
  dataSourceOrganizer: MatTableDataSource<OrganizerDto>;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(
    private eventService: EventService,
    private subeventService: SubeventService,
    private organizerService: OrganizerService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private loaderService: LoaderService,
    private _liveAnnouncer: LiveAnnouncer,
  ) { }

  ngOnInit(): void {
    this.loaderService.show()
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    this.fetchEvent(this.eventId);
    this.fetchOrganizers(this.eventId);
  }

  fetchEvent(eventId: string) {
    this.eventService.getEventById(eventId)
      .pipe(first())
      .subscribe(
        eventDto => {
          this.eventDto = eventDto;
          this.fetchSubevents(this.eventId);
        }
      );
  }

  fetchSubevents(eventId: string) {
    this.subeventService.getSubevents(eventId)
      .subscribe(subevents => {
        this.subeventsDto = subevents;
        this.dataSource = new MatTableDataSource<SubeventDto>(this.subeventsDto);
        this.loaderService.hide();
        this.setTabSelectedIndex();
      });
  }

  fetchOrganizers(eventId: string) {
    this.organizerService.getOrganizers(eventId)
        .pipe(first())
        .subscribe(organizersDto => {
          this.organizersDto = organizersDto;
          this.dataSourceOrganizer = new MatTableDataSource<OrganizerDto>(this.organizersDto);
          console.log(organizersDto)
        })
  }

  openEventList() {
    return this.router.navigate(['admin', 'events']);
  }

  setTabSelectedIndex() {
    this.route.queryParams.subscribe(params => this.tabSelectedIndex = params['tab']);
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

  openCancelDialog() {
    const dialogRef = this.dialog.open(CancelDialogComponent, {
      width: '400px',
      data: {name: "Evento", cancelMessage: this.cancellationMessageCreateDto, cancelText: "Fechar", okText: "Cancelar"},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.cancellationMessageCreateDto = result;
        this.cancelEvent();
      }
    });
  }

  cancelEvent() {
    this.eventService.cancelEvent(this.eventId, this.cancellationMessageCreateDto)
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

  announceSortChange(sort: Sort) {
    this.dataSource.sort = this.sort;

    if (sort.direction) {
      this._liveAnnouncer.announce(`Ordenado ${sort.direction}final`);
    } else {
      this._liveAnnouncer.announce('Ordenação removida');
    }
  }
}
