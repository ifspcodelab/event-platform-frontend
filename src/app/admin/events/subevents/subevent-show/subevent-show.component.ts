import { Component, OnInit } from '@angular/core';
import { SubeventDto } from "../../../../core/models/subevent.model";
import { SubeventService } from "../../../../core/services/subevent.service";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs";
import { NotificationService } from 'src/app/core/services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ProblemDetail } from 'src/app/core/models/problem-detail';
import { ActivityDto } from "../../../../core/models/activity.model";
import { ActivityService } from "../../../../core/services/activity.service";

@Component({
  selector: 'app-subevent-show',
  templateUrl: './subevent-show.component.html',
  styleUrls: ['./subevent-show.component.scss']
})
export class SubeventShowComponent implements OnInit {
  subeventDto: SubeventDto;
  subeventId: string;
  eventId: string;

  activitiesDto: ActivityDto[] = [];
  activitiesDisplayedColumns: string[] = ['title', 'online', 'registrationRequired', 'status'];

  tabSelectedIndex: number = 0;

  constructor(
    private notificationService: NotificationService,
    private subeventService: SubeventService,
    private activityService: ActivityService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    this.subeventId = this.route.snapshot.paramMap.get('subeventId');
    this.fetchSubevent(this.eventId, this.subeventId);
  }

  fetchSubevent(eventId: string, subeventId: string) {
    this.subeventService.getSubeventById(eventId, subeventId)
      .pipe(first())
      .subscribe(subeventDto => {
        this.subeventDto = subeventDto
        this.fetchActivities(this.eventId);
      });
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

  openEventShow() {
    return this.router.navigate(['admin', 'events', this.eventId]);
  }

  openActivityShow(activityDto: ActivityDto) {
    return this.router.navigate(['admin', 'events', this.eventId, 'sub-events', this.subeventId, 'activities', activityDto.id]);
  }

  publishSubevent() {
    this.subeventService.publishSubevent(this.eventId, this.subeventId)
      .pipe(first())
      .subscribe({
        next: subeventDto => {
          this.subeventDto = subeventDto
          this.notificationService.success("Subevento publicado com sucesso");
        },
        error: error => this.handleError(error)
      });
  }

  unpublishSubevent() {
    this.subeventService.unpublishSubevent(this.eventId, this.subeventId)
      .pipe(first())
      .subscribe({
        next: subeventDto => {
          this.subeventDto = subeventDto
          this.notificationService.success("Subevento despublicado com sucesso");
        },
        error: error => this.handleError(error)
      });
  }

  cancelSubevent() {
    this.subeventService.cancelSubevent(this.eventId, this.subeventId)
      .pipe(first())
      .subscribe({
        next: subeventDto => {
          this.subeventDto = subeventDto
          this.notificationService.success("Subevento cancelado com sucesso");
        },
        error: error => this.handleError(error)
      });
  }

  private getConfirmationDialogConfig() {
    return {
      autoFocus: true,
      data: {
        name: "Excluir subevento",
        text: `O subevento ${this.subeventDto.title} será excluido de forma definitiva.`,
        cancelText: "Cancelar",
        okText: "Excluir"
      }
    };
  }

  openDeleteConfirmationDialog() {
    this.dialog.open(ConfirmationDialogComponent, this.getConfirmationDialogConfig()).afterClosed()
      .subscribe( result => {
        if (result) {
          this.deleteSubevent();
        }
      });
  }

  deleteSubevent() {
    this.subeventService.deleteSubevent(this.eventId, this.subeventId)
      .pipe(first())
      .subscribe({
        next: () => {
          this.notificationService.success("Subevento excluído com sucesso");
          this.router.navigate(['admin', 'events', this.eventId])
        },
        error: error => this.handleError(error)
      });
  }

  handleError(error: any) {
    if(error instanceof HttpErrorResponse) {
      if(error.status === 409) {
        const problem: ProblemDetail = error.error;
        console.log(problem);
        this.notificationService.error(problem.violations[0].message);
      }
    }
  }
}
