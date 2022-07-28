import { Component, OnInit } from '@angular/core';
import {SubeventDto} from "../../../../core/models/subevent.model";
import {SubeventService} from "../../../../core/services/subevent.service";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs";
import { NotificationService } from 'src/app/core/services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ProblemDetail } from 'src/app/core/models/problem-detail';

@Component({
  selector: 'app-subevent-show',
  templateUrl: './subevent-show.component.html',
  styleUrls: ['./subevent-show.component.scss']
})
export class SubeventShowComponent implements OnInit {

  subeventDto: SubeventDto;
  subeventId: string;
  eventId: string;

  constructor(
    private notificationService: NotificationService,
    private subeventService: SubeventService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    this.subeventId = this.route.snapshot.paramMap.get('subeventId');

    this.fetchSubevent(this.eventId, this.subeventId);
  }

  fetchSubevent(eventId: string, subeventId: string) {
    this.subeventService.getSubeventById(eventId, subeventId)
      .pipe(first())
      .subscribe(
        subeventDto => {
          this.subeventDto = subeventDto;
        }
      )
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
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,  this.getConfirmationDialogConfig());
    dialogRef.afterClosed().subscribe( result => {
      if (result) {
        this.subeventService.deleteSubevent(this.eventId, this.subeventId)
          .pipe(first())
          .subscribe( () => {
            this.notificationService.success("Excluido com sucesso");
            this.router.navigate(['admin', 'events'])
          }, error => {
            this.handleError(error);
          })
      }
    })
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
