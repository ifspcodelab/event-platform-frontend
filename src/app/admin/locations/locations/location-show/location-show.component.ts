import { NotificationService } from './../../../../core/services/notification.service';
import { AreaService } from './../../../../core/services/area.service';
import { AreaDto } from './../../../../core/models/area.model';
import { LocationService } from './../../../../core/services/location.service';
import { LocationDto } from './../../../../core/models/location.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from "rxjs/operators";
import { LocationFormComponent } from '../location-form/location-form.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/core/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-location-show',
  templateUrl: './location-show.component.html',
  styleUrls: ['./location-show.component.scss']
})
export class LocationShowComponent implements OnInit {
  locationId: string;
  locationDto: LocationDto;
  areasDto: AreaDto[];
  displayedColumns: string[] = ['name', 'reference'];
  dataSource: LocationDto[] = [];

  constructor(
    private locationService: LocationService,
    private areaService: AreaService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.locationId = this.route.snapshot.paramMap.get('locationId');

    if(this.locationId) {
      this.fetchLocation(this.locationId);
    }
  }

  fetchLocation(locationId: string) {
    this.locationService.getLocationById(locationId)
      .pipe(first())
      .subscribe(
        locationDto => {
          this.locationDto = locationDto;
          this.fetchAreas(locationId);
        }
      )
  }

  fetchAreas(locationId: string) {
    this.areaService.getAreas(locationId)
      .pipe(first())
      .subscribe(
        areasDto => {
          this.areasDto = areasDto;
        }
      )
  }

  openLocationList() {
    this.router.navigate(['admin', 'locations']);
  }

  openAreaShow(areaDto: AreaDto) {
    this.router.navigate(['admin', 'locations', this.locationId, 'areas', areaDto.id]);
  }

  private getDialogConfig() {
    return {
      autoFocus: true,
      data: {
        locationDto: this.locationDto
      }
    };
  }

  openEditLocationFormDialog() {
    const dialogRef = this.dialog.open(LocationFormComponent, this.getDialogConfig());

    dialogRef.afterClosed().subscribe(locationDto => {
      if (locationDto) {
        this.locationDto = locationDto;
        this.notificationService.success("Editado com sucesso");
      }
    });
  }

  private getConfirmationDialogConfig() {
    return {
      autoFocus: true,
      data: {
        name: "Excluir local",
        text: `O local ${this.locationDto.name} será excluido de forma definitiva`,
        cancelText: "Cancelar",
        okText: "Excluir"
      }
    };
  }

  openDeleteConfirmationDialog() {
    if(this.areasDto.length != 0) {
      this.notificationService.error('Não é possível deletar um local com área associada');
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent,  this.getConfirmationDialogConfig());
    dialogRef.afterClosed().subscribe( result => {
      if (result) {
        this.locationService.deleteLocation(this.locationId)
          .pipe(first())
          .subscribe( _ => {
            this.notificationService.success("Excluído com sucesso");
            this.router.navigate(['admin', 'locations'])
          }, error => {

          })
      }
    })
  }
}
