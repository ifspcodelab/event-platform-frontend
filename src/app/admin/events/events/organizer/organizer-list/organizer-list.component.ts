import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AccountDto } from "../../../../../core/models/account.model";
import { OrganizerDto } from "../../../../../core/models/organizer.model";
import { OrganizerService } from "../../../../../core/services/organizer.service";
import { NotificationService } from "../../../../../core/services/notification.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { LoaderService } from "../../../../loader.service";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { first } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";
import { OrganizerFormComponent } from "../organizer-form/organizer-form.component";
import { ConfirmationDialogComponent } from "../../../../../core/components/confirmation-dialog/confirmation-dialog.component";
import { HttpErrorResponse } from "@angular/common/http";
import { MatSort, Sort } from "@angular/material/sort";

@Component({
  selector: 'app-organizer-list',
  templateUrl: './organizer-list.component.html',
  styleUrls: ['./organizer-list.component.scss']
})
export class OrganizerListComponent implements OnInit {
  displayedColumnsOrganizer: string[] = ['name', 'email', 'type', 'action'];
  tabSelectedIndex: number = 0;
  accountDto: AccountDto;
  organizersDto: OrganizerDto[] = [];
  organizerDto: OrganizerDto;
  organizerId: string;
  dataSource: MatTableDataSource<OrganizerDto>;
  @Input()
  eventId: string;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(
    private organizerService: OrganizerService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private loaderService: LoaderService,
    private _liveAnnouncer: LiveAnnouncer
  ) {
  }

  ngOnInit(): void {
    this.loaderService.show()
    this.organizerId = this.route.snapshot.paramMap.get('organizerId');
    this.fetchOrganizers(this.eventId);
  }

  fetchOrganizers(eventId: string) {
    this.organizerService.getOrganizers(eventId)
      .pipe(first())
      .subscribe(organizersDto => {
        this.organizersDto = organizersDto;
        this.dataSource = new MatTableDataSource<OrganizerDto>(this.organizersDto);
        this.loaderService.hide();
        this.setTabSelectedIndex();
      });
  }

  setTabSelectedIndex() {
    this.route.queryParams.subscribe(params => this.tabSelectedIndex = params['tab']);
  }

  private getDialogConfig() {
    return {
      autoFocus: true,
      width: '450px',
      data: {
        eventId: this.eventId,
        organizerDto: this.organizerDto
      }
    };
  }

  openOrganizerFormDialog() {
    this.dialog.open(OrganizerFormComponent, this.getDialogConfig()).afterClosed()
      .subscribe(organizerDto => {
        if (organizerDto) {
          this.organizersDto = [...this.organizersDto, organizerDto];
          this.notificationService.success("Organizador cadastrado com sucesso");
          // this.dataSourceOrganizer = new MatTableDataSource<OrganizerDto>(this.organizersDto);
        }
      });
  }

  private getConfirmationDialogConfigOrganizer(organizerDto: OrganizerDto) {
    return {
      autoFocus: true,
      data: {
        name: "Remover organizador",
        text: `O organizador  ${organizerDto.account.name} será excluído de forma definitiva.`,
        cancelText: "Cancelar",
        okText: "Remover"
      }
    }
  }

  openDeleteConfirmationDialogOrganizer(organizerDto: OrganizerDto) {
    this.dialog.open(ConfirmationDialogComponent, this.getConfirmationDialogConfigOrganizer(organizerDto))
      .afterClosed()
      .subscribe(result => {
        if (result) {
          this.deleteOrganizer(organizerDto.id);
        }
      });
  }

  deleteOrganizer(organizerId: string) {
    this.organizerService.deleteOrganizer(this.eventId, organizerId)
      .pipe(first())
      .subscribe({
        next: () => {
          this.notificationService.success("Organizador excluído com sucesso");
          this.organizersDto = this.organizersDto.filter(o => o.id != organizerId);
          this.dataSource = new MatTableDataSource<OrganizerDto>(this.organizersDto);
        }
      });
  }

  handleError(error: any) {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 409) {
        this.notificationService.error(error.error.violations[0].message);
      }
    }
  }


  announceSortChangeEvent(sort: Sort) {
    this.dataSource.sort = this.sort;

    if (sort.direction) {
      this._liveAnnouncer.announce(`Ordenado ${sort.direction}final`);
    } else {
      this._liveAnnouncer.announce('Ordenação removida');
    }
  }
}
