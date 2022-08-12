import { Component, OnInit } from '@angular/core';
import { CancellationMessageCreateDto, SubeventDto } from "../../../../core/models/subevent.model";
import { SubeventService } from "../../../../core/services/subevent.service";
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs";
import { NotificationService } from 'src/app/core/services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ProblemDetail } from 'src/app/core/models/problem-detail';
import { CancelDialogComponent } from "../../../../core/components/cancel-dialog/cancel-dialog.component";
import { LoaderService } from "../../../loader.service";
import { OrganizerSubeventDto } from 'src/app/core/models/organizer-subevent.model';
import { OrganizerSubeventService } from 'src/app/core/services/organizer-subevent.service';
import { OrganizerSubeventFormComponent } from '../organizer-subevent-form/organizer-subevent-form.component';

@Component({
  selector: 'app-subevent-show',
  templateUrl: './subevent-show.component.html',
  styleUrls: ['./subevent-show.component.scss']
})
export class SubeventShowComponent implements OnInit {
  displayedColumnsOrganizerSubevent: string[] = ['name', 'email', 'type', 'action'];
  organizersSubeventDto: OrganizerSubeventDto[] = [];
  organizerSubeventDto: OrganizerSubeventDto;
  subeventDto: SubeventDto;
  subeventId: string;
  eventId: string;
  organizerSubeventId: string;
  cancellationMessageCreateDto: CancellationMessageCreateDto;
  tabSelectedIndex: number = 0;

  constructor(
    private notificationService: NotificationService,
    private subeventService: SubeventService,
    private organizerSubeventService: OrganizerSubeventService,
    private route: ActivatedRoute,
    private router: Router,
    private loaderService: LoaderService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loaderService.show()
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    this.organizerSubeventId = this.route.snapshot.paramMap.get('organizerSubeventId');
    this.subeventId = this.route.snapshot.paramMap.get('subeventId');
    this.fetchSubevent(this.eventId, this.subeventId);
    this.fetchOrganizersSubevent(this.eventId, this.subeventId);
  }

  fetchSubevent(eventId: string, subeventId: string) {
    this.subeventService.getSubeventById(eventId, subeventId)
      .pipe(first())
      .subscribe(subeventDto => {
        this.subeventDto = subeventDto
        this.loaderService.hide();
        this.setTabSelectedIndex();
      });
  }

  fetchOrganizersSubevent(eventId: string, subeventId: string) {
    this.organizerSubeventService.getOrganizersSubevent(eventId, subeventId)
        .pipe(first())
        .subscribe(organizersSubeventDto => {
          this.organizersSubeventDto = organizersSubeventDto;
          console.log(organizersSubeventDto)
        })
  }

  openEventShow() {
    return this.router.navigate(['admin', 'events', this.eventId], { queryParams: { tab: 1 }});
  }

  setTabSelectedIndex() {
    this.route.queryParams.subscribe(params => this.tabSelectedIndex = params['tab']);
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

  openCancelDialog() {
    const dialogRef = this.dialog.open(CancelDialogComponent, {
      width: '400px',
      data: {name: "Subevento", cancelMessage: this.cancellationMessageCreateDto, cancelText: "Fechar", okText: "Cancelar"},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.cancellationMessageCreateDto = result;
        this.cancelSubevent();
      }
    });
  }

  cancelSubevent() {
    this.subeventService.cancelSubevent(this.eventId, this.subeventId, this.cancellationMessageCreateDto)
      .pipe(first())
      .subscribe({
        next: subeventDto => {
          this.subeventDto = subeventDto
          this.notificationService.success("Subevento cancelado com sucesso");
        },
        error: error => this.handleError(error)
      });
  }

  private getDialogConfig() {
    return {
      autoFocus: true,
      data: {
        eventId: this.eventId,
        subeventId: this.subeventId,
        organizerSubeventDto: this.organizerSubeventDto
      }
    };
  }

  openAddOrganizerSubeventFormDialog() {
    const dialogRef = this.dialog.open(OrganizerSubeventFormComponent, this.getDialogConfig());
    dialogRef.afterClosed().subscribe(
      organizerSubeventDto => {
        if (organizerSubeventDto) {
          this.organizersSubeventDto = [...this.organizersSubeventDto, organizerSubeventDto];
          this.notificationService.success("Cadastrado com sucesso");
        }
    })
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

  private getConfirmationDialogConfigOrganizerSubevent() {
    return {
       autoFocus: true,
    data: {
        name: "Remover organizador",
        text: `O organizador ${this.organizerSubeventDto.account.name} será excluido de forma definitiva.`,
        cancelText: "Cancelar",
        okText: "Remover"
      }
    }
  }

  openDeleteConfirmationDialogOrganizerSubevent() {
    this.dialog.open(ConfirmationDialogComponent, this.getConfirmationDialogConfigOrganizerSubevent()).afterClosed()
      .subscribe( result => {
        if (result) {
          this.deleteOrganizerSubevent();
        }
      });
  }

  deleteOrganizerSubevent() {
    this.organizerSubeventService.deleteOrganizerSubevent(this.eventId, this.subeventId, this.organizerSubeventId)
      .pipe(first())
      .subscribe({
         next: () => {
           this.notificationService.success("Excluido com sucesso");
           this.router.navigate(['admin', 'events', this.eventId, 'sub-events', this.subeventId, 'organizers'])
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
