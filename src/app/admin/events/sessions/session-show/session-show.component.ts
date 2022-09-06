import { Component, OnInit } from '@angular/core';
import { ActivityDto, SessionDto, SessionScheduleDto } from "../../../../core/models/activity.model";
import { LocationDto } from "../../../../core/models/location.model";
import { AreaDto } from "../../../../core/models/area.model";
import { SpaceDto } from "../../../../core/models/space.model";
import { CancellationMessageCreateDto } from "../../../../core/models/event.model";
import { ActivityService } from "../../../../core/services/activity.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { NotificationService } from "../../../../core/services/notification.service";
import { SessionService } from "../../../../core/services/session.service";
import { first } from "rxjs";
import { CancelDialogComponent } from "../../../../core/components/cancel-dialog/cancel-dialog.component";
import { ConfirmationDialogComponent } from "../../../../core/components/confirmation-dialog/confirmation-dialog.component";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-session-show',
  templateUrl: './session-show.component.html',
  styleUrls: ['./session-show.component.scss']
})
export class SessionShowComponent implements OnInit {
  eventMode: boolean = true;
  eventId: string = null;
  subeventId: string = null;
  activityId: string;
  sessionId: string;
  sessionDto: SessionDto = null;
  cancellationMessageCreateDto: CancellationMessageCreateDto;

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    this.subeventId = this.route.snapshot.paramMap.get('subeventId');
    this.activityId = this.route.snapshot.paramMap.get('activityId');
    this.sessionId = this.route.snapshot.paramMap.get('sessionId');

    if(this.subeventId) {
      this.eventMode = false;
      this.fetchSubEventSession();
    } else {
      this.fetchEventSession();
    }
  }

  private fetchSubEventSession() {
    this.sessionService.getSubEventSession(this.eventId, this.subeventId, this.activityId, this.sessionId)
      .pipe(first())
      .subscribe(sessionDto => {
        this.sessionDto = sessionDto;
      })
  }

  private fetchEventSession() {
    this.sessionService.getEventSession(this.eventId, this.activityId, this.sessionId)
      .pipe(first())
      .subscribe(sessionDto => {
        this.sessionDto = sessionDto;
      })
  }

  backLink() {
    if(this.eventMode) {
      return this.router.navigate(
        ['admin', 'events', this.eventId, 'activities', this.activityId], { queryParams: { tab: 2 } }
      );
    } else {
      return this.router.navigate(
        ['admin', 'events', this.eventId, 'sub-events', this.subeventId, 'activities', this.activityId], { queryParams: { tab: 2 } }
      );
    }

  }

  openCancelDialog() {
    const dialogRef = this.dialog.open(CancelDialogComponent, {
      width: '400px',
      data: { name: "Sessão", cancelMessage: this.cancellationMessageCreateDto, cancelText: "Fechar", okText: "Cancelar"},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.cancellationMessageCreateDto = result;
        return this.eventMode ? this.cancelEventSession() : this.cancelSubEventSession();
      }
    });
  }

  cancelEventSession() {
    this.sessionService.cancelEventSession(this.eventId, this.activityId, this.sessionId, this.cancellationMessageCreateDto)
      .pipe(first())
      .subscribe({
        next: sessionDto => {
          this.notificationService.success("Sessão cancelada com sucesso")
          this.sessionDto = sessionDto;
        },
        error: error => this.handleError(error)
      });
  }

  cancelSubEventSession() {
    this.sessionService.cancelSubEventSession(this.eventId, this.subeventId, this.activityId,  this.sessionId, this.cancellationMessageCreateDto)
      .pipe(first())
      .subscribe({
        next: sessionDto => {
          this.notificationService.success("Sessão cancelada com sucesso")
          this.sessionDto = sessionDto;
        },
        error: error => this.handleError(error)
      });
  }

  private getConfirmationDialogConfig() {
    return {
      autoFocus: true,
      data: {
        name: "Excluir sessão",
        text: `A sessão ${this.sessionDto.title} será excluída de forma definitiva.`,
        cancelText: "Cancelar",
        okText: "Excluir"
      }
    }
  }

  openDeleteConfirmationDialog() {
    this.dialog.open(ConfirmationDialogComponent, this.getConfirmationDialogConfig()).afterClosed()
      .subscribe( result => {
        if (result) {
          if(this.eventMode) {
            this.deleteEventSession();
          } else {
            this.deleteSubEventSession();
          }
        }
      });
  }

  deleteEventSession() {
    this.sessionService.deleteEventSession(this.eventId, this.activityId, this.sessionId)
      .pipe(first())
      .subscribe({
        next: () => {
          this.notificationService.success("Atividade excluida com sucesso");
          this.backLink();
        },
        error: error => this.handleError(error)
      });
  }

  deleteSubEventSession() {
    this.sessionService.deleteSubEventSession(this.eventId, this.subeventId, this.activityId, this.sessionId)
      .pipe(first())
      .subscribe({
        next: () => {
          this.notificationService.success("Atividade excluida com sucesso");
          this.backLink();
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
