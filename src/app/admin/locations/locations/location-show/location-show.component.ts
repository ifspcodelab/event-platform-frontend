import { ConfirmationDialogComponent } from './../../../../core/components/confirmation-dialog/confirmation-dialog/confirmation-dialog.component';
import { NotificationService } from './../../../../core/services/notification.service';
import { LocationFormComponent } from './../location-form/location-form.component';
import { AreaFormComponent } from './../../areas/area-form/area-form.component';
import { AreaService } from './../../../../core/services/area.service';
import { AreaDto } from './../../../../core/models/area.model';
import { LocationService } from './../../../../core/services/location.service';
import { LocationDto } from './../../../../core/models/location.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { first } from "rxjs/operators";
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from "@angular/material/sort";
import { LiveAnnouncer } from '@angular/cdk/a11y';



@Component({
  selector: 'app-location-show',
  templateUrl: './location-show.component.html',
  styleUrls: ['./location-show.component.scss']
})
export class LocationShowComponent implements OnInit {
  locationId: string;
  locationDto: LocationDto;
  areaDto: AreaDto;
  areasDto: AreaDto[] = [];
  displayedColumns: string[] = ['name', 'reference'];
  dataSource: MatTableDataSource<AreaDto>;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(
    private locationService: LocationService,
    private areaService: AreaService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  ngOnInit(): void {
    this.locationId = this.route.snapshot.paramMap.get('locationId');
    this.fetchLocation(this.locationId);
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
      .subscribe(areasDto => {
        this.areasDto = areasDto;
        this.dataSource = new MatTableDataSource<AreaDto>(this.areasDto)
      });
  }

  openLocationList() {
    this.router.navigate(['admin', 'locations']);
  }

  openAreaShow(areaDto: AreaDto) {
    console.log(areaDto);
    this.router.navigate(['admin', 'locations', this.locationId, 'areas', areaDto.id]);
  }

  openEditLocationFormDialog() {
    const dialogRef = this.dialog.open(LocationFormComponent, this.getDialogConfigLocation());
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

  private getDialogConfigArea() {
    return {
      autoFocus: true,
      data: {
        locationId: this.locationId,
        areaDto: this.areaDto
      }
    };
  }

  private getDialogConfigLocation() {
    return {
      autoFocus: true,
      data: {
        locationDto: this.locationDto
      }
    };
  }

  openAddFormAreaDialog() {
    const dialogRef = this.dialog.open(AreaFormComponent, this.getDialogConfigArea());
    dialogRef.afterClosed().subscribe( areaDto => {
      if(areaDto) {
        this.areasDto = [...this.areasDto, areaDto];
        this.notificationService.success("Cadastrada com sucesso");
        this.dataSource = new MatTableDataSource<AreaDto>(this.areasDto);
      }
    });
  }

  openFormLocationDialog() {
    const dialogRef = this.dialog.open(LocationFormComponent, this.getDialogConfigLocation());

    dialogRef.afterClosed().subscribe(locationDto => {
      if (locationDto) {
        this.locationDto = locationDto;
      }
    });
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

  announceSortChange(sort: Sort) {
    this.dataSource.sort = this.sort;

    if (sort.direction) {
      this._liveAnnouncer.announce(`Sorted ${sort.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
