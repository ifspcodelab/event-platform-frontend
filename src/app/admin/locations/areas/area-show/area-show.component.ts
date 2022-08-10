import { SpaceService } from '../../../../core/services/space.service';
import { SpaceDto } from '../../../../core/models/space.model';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaService } from '../../../../core/services/area.service';
import { AreaDto } from '../../../../core/models/area.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SpaceFormComponent } from "../../spaces/space-form/space-form.component";
import { MatDialog } from "@angular/material/dialog";
import { NotificationService } from "../../../../core/services/notification.service";
import { MatSort, Sort } from "@angular/material/sort";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { MatTableDataSource } from "@angular/material/table";
import {AreaFormComponent} from "../area-form/area-form.component";
import {
  ConfirmationDialogComponent
} from "../../../../core/components/confirmation-dialog/confirmation-dialog.component";
import {HttpErrorResponse} from "@angular/common/http";
import { LoaderService } from "../../../loader.service";

@Component({
  selector: 'app-area-show',
  templateUrl: './area-show.component.html',
  styleUrls: ['./area-show.component.scss']
})
export class AreaShowComponent implements OnInit {
  locationId: string;
  areaId: string;
  areaDto: AreaDto;
  spacesDto: SpaceDto[] = [];
  dataSource: MatTableDataSource<SpaceDto>;
  displayedColumns: string[] = ['name', 'capacity', 'type'];
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(
    private areaService: AreaService,
    private spaceService: SpaceService,
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
    this.locationId = this.route.snapshot.paramMap.get('locationId');
    this.areaId = this.route.snapshot.paramMap.get('areaId');
    this.fetchArea(this.locationId, this.areaId);
  }

  fetchArea(locationId: string, areaId: string) {
    this.areaService.getAreaById(locationId, areaId)
      .pipe(first())
      .subscribe(
       areaDto => {
        this.areaDto = areaDto;
        this.fetchSpaces(locationId, areaId)
      });
  }

  fetchSpaces(locationId: string, areaId: string) {
    this.spaceService.getSpaces(locationId, areaId)
      .pipe(first())
      .subscribe(
      spacesDto => {
        this.spacesDto = spacesDto;
        this.dataSource = new MatTableDataSource<SpaceDto>(this.spacesDto);
        this.loaderService.hide();
      });
  }

  openLocationShow() {
    this.router.navigate(['admin', 'locations', this.locationId]);
  }

  openSpaceShow(spaceDto: SpaceDto) {
    this.router.navigate(['admin', 'locations', this.locationId, 'areas', this.areaId, 'spaces', spaceDto.id]);
  }

  private getDialogConfigArea() {
    return {
      autoFocus: true,
      data: {
        locationId: this.locationId,
        areaDto: this.areaDto
      }
    };
  }

  openEditAreaFormDialog() {
    const dialogRef = this.dialog.open(AreaFormComponent, this.getDialogConfigArea());
    dialogRef.afterClosed()
      .subscribe(areaDto => {
        if(areaDto) {
          this.areaDto = areaDto;
          this.notificationService.success("Editada com sucesso");
        }
      });
  }

  private getConfirmationDialogConfig() {
    return {
      autoFocus: true,
      data: {
        name: "Excluir área",
        text: `A área ${this.areaDto.name} será excluida de forma definitiva`,
        cancelText: "Cancelar",
        okText: "Excluir"
      }
    };
  }

  openDeleteConfirmationDialog() {
    if(this.spacesDto.length != 0) {
      this.notificationService.error('Não é possível deletar uma área com espaço associado');
    } else {
      this.dialog.open(ConfirmationDialogComponent,  this.getConfirmationDialogConfig())
        .afterClosed()
        .subscribe(result => this.deleteArea(result));
    }
  }

  deleteArea(result: any) {
    if(result) {
      this.areaService.deleteArea(this.locationId, this.areaId)
        .pipe(first())
        .subscribe({
          next: _ => {
            this.notificationService.success("Área excluída com sucesso");
            this.router.navigate(['admin', 'locations', this.locationId])
          },
          error: error => {
            if(error instanceof HttpErrorResponse) {
              if(error.status === 409) {
                this.notificationService.error("Não é possível deletar uma área com espaço associado");
              }
            }
          }
        });
    }
  }

  private getDialogConfig() {
    return {
      autoFocus: true,
      data: {
        locationId: this.locationId,
        areaId: this.areaId
      }
    };
  }

  openAddSpaceFormDialog() {
    this.dialog.open(SpaceFormComponent, this.getDialogConfig()).afterClosed()
      .subscribe(spaceDto => {
        if (spaceDto) {
          this.notificationService.success("Espaço cadastrado com sucesso");
          this.spacesDto = [...this.spacesDto, spaceDto];
          this.dataSource = new MatTableDataSource<SpaceDto>(this.spacesDto);
        }
      });
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
