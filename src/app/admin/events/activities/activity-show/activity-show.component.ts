import { Component, OnInit } from '@angular/core';
import { EventStatusModel } from "../../../../core/models/event-status.model";
import { ActivatedRoute, Router } from "@angular/router";
import { ActivityDto, SessionDto } from "../../../../core/models/activity.model";
import { ActivityService } from "../../../../core/services/activity.service";
import { first } from "rxjs";
import { ConfirmationDialogComponent } from "../../../../core/components/confirmation-dialog/confirmation-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { NotificationService } from "../../../../core/services/notification.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-activity-show',
  templateUrl: './activity-show.component.html',
  styleUrls: ['./activity-show.component.scss']
})
export class ActivityShowComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title'];
  eventMode: boolean = true;
  activityId: string;
  activityDto: ActivityDto;
  eventId: string = null;
  subeventId: string = null;
  sessionsDto: SessionDto[] = [];

  constructor(
    private activityService: ActivityService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    this.subeventId = this.route.snapshot.paramMap.get('subeventId');
    this.activityId = this.route.snapshot.paramMap.get('activityId');

    if(this.subeventId) {
      this.eventMode = false;
      this.fetchSubEventActivity();
    } else {
      this.fetchEventActivity();
    }


  }

  fetchEventActivity() {
    this.activityService.getEventActivity(this.eventId, this.activityId)
      .pipe(first())
      .subscribe({
        next: activityDto => {
          this.activityDto = activityDto;
        }
      })
  }

  fetchSubEventActivity() {
    this.activityService.getSubEventActivity(this.eventId, this.subeventId, this.activityId)
      .pipe(first())
      .subscribe({
        next: activityDto => {
          this.activityDto = activityDto;
        }
      })
  }

  backLink() {
    if(this.eventMode) {
      return this.router.navigate(['admin', 'events', this.eventId], { queryParams: { tab: 2 } });
    } else {
      return this.router.navigate(['admin', 'events', this.eventId, 'sub-events', this.subeventId], { queryParams: { tab: 2 } });
    }

  }

  publishActivity() {
    return this.eventMode ? this.publishEventActivity() : this.publishSubEventActivity();
  }

  publishEventActivity() {
    this.activityService.publishEventActivity(this.eventId, this.activityId)
      .pipe(first())
      .subscribe({
        next: activityDto => {
          this.notificationService.success("Atividade publicada com sucesso")
          this.activityDto = activityDto;
        },
        error: error => this.handleError(error)
      });
  }

  publishSubEventActivity() {
    this.activityService.publishSubEventActivity(this.eventId, this.subeventId, this.activityId)
      .pipe(first())
      .subscribe({
        next: activityDto => {
          this.notificationService.success("Atividade publicada com sucesso")
          this.activityDto = activityDto;
        },
        error: error => this.handleError(error)
      });
  }

  unpublishActivity() {
    return this.eventMode ? this.unpublishEventActivity() : this.unpublishSubEventActivity();
  }

  unpublishEventActivity() {
    this.activityService.unpublishEventActivity(this.eventId, this.activityId)
      .pipe(first())
      .subscribe({
        next: activityDto => {
          this.notificationService.success("Atividade despublicada com sucesso")
          this.activityDto = activityDto;
        },
        error: error => this.handleError(error)
      });
  }

  unpublishSubEventActivity() {
    this.activityService.unpublishSubEventActivity(this.eventId, this.subeventId, this.activityId)
      .pipe(first())
      .subscribe({
        next: activityDto => {
          this.notificationService.success("Atividade despublicada com sucesso")
          this.activityDto = activityDto;
        },
        error: error => this.handleError(error)
      });
  }

  cancelActivity() {
    if(this.eventMode) {

    } else {

    }
  }

  private getConfirmationDialogConfig() {
    return {
      autoFocus: true,
      data: {
        name: "Excluir atividade",
        text: `A atividade ${this.activityDto.title} será excluida de forma definitiva.`,
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
            this.deleteEventActivity();
          } else {
            this.deleteSubEventActivity();
          }
        }
      });
  }

  deleteEventActivity() {
    this.activityService.deleteEventActivity(this.eventId, this.activityId)
      .pipe(first())
      .subscribe({
        next: () => {
          this.notificationService.success("Atividade excluida com sucesso");
          this.router.navigate(['admin', 'events', this.eventId], { queryParams: { tab: 2 } })
        },
        error: error => this.handleError(error)
      });
  }

  deleteSubEventActivity() {
    this.activityService.deleteSubEventActivity(this.eventId, this.subeventId, this.activityId)
      .pipe(first())
      .subscribe({
        next: () => {
          this.notificationService.success("Atividade excluida com sucesso");
          this.router.navigate(['admin', 'events', this.eventId, 'sub-events', this.subeventId], { queryParams: { tab: 2 } })
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

  openSessionShow(row: any) {
    console.log(this.subeventId)
    if (this.eventMode) {
      return this.router.navigate(
        ['admin', 'events',  this.eventId, 'activities', this.activityDto.id, 'sessions', row.id]
      );
    }
    return this.router.navigate(
      ['admin', 'events', this.eventId, 'sub-events', this.subeventId, 'activities', this.activityDto.id, 'sessions', row.id]
    );
  }
}
