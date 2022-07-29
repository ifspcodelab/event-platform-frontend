import { ConfirmationDialogComponent } from './../../../../core/components/confirmation-dialog/confirmation-dialog/confirmation-dialog.component';
import { NotificationService } from './../../../../core/services/notification.service';
import { LocationDto } from './../../../../core/models/location.model';
import { MatDialog } from '@angular/material/dialog';
import { AreaFormComponent } from './../area-form/area-form.component';
import { SpaceService } from '../../../../core/services/space.service';
import { SpaceDto } from './../../../../core/models/space.model';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaService } from './../../../../core/services/area.service';
import { AreaDto } from './../../../../core/models/area.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-area-show',
  templateUrl: './area-show.component.html',
  styleUrls: ['./area-show.component.scss']
})
export class AreaShowComponent implements OnInit {
  locationId: string;
  areaId: string;
  areaDto: AreaDto;
  areasDto: AreaDto[];
  spacesDto: SpaceDto[];
  displayedColumns: string[] = ['name', 'capacity', 'type'];


  constructor(
    private areaService: AreaService,
    private spaceService: SpaceService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
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
        }
      )
  }

  fetchSpaces(locationId: string, areaId: string) {
    this.spaceService.getSpaces(locationId, areaId)
      .pipe(first())
      .subscribe(
        spacesDto => {
          this.spacesDto = spacesDto;
        }
      )
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

  openEditFormAreaDialog() {
    const dialogRef = this.dialog.open(AreaFormComponent, this.getDialogConfigArea());
    dialogRef.afterClosed().subscribe( areaDto => {
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
    }
    else {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent,  this.getConfirmationDialogConfig());
      dialogRef.afterClosed().subscribe( result => {
        if (result) {
          this.areaService.deleteArea(this.locationId, this.areaId)
            .pipe(first())
            .subscribe( _ => {
              this.notificationService.success("Excluido com sucesso");
              this.router.navigate(['admin', 'locations', this.locationId])
            }, error => {

            })
        }
      })
    }
  }
}
