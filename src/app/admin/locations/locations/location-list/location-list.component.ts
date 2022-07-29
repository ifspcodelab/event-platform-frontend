import { Component, OnInit } from '@angular/core';
import { LocationDto } from 'src/app/core/models/location.model';
import { LocationService } from 'src/app/core/services/location.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LocationFormComponent } from '../location-form/location-form.component';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit {
  locationDto: LocationDto;
  displayedColumns: string[] = ['name', 'address'];
  locationsDto: LocationDto[] = [];

  constructor(
    private locationService: LocationService,
    private notificationService: NotificationService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.locationService.getLocations().subscribe(
      locations => this.locationsDto = locations
    )
  }

  openLocationShow(locationDto: LocationDto) {
    this.router.navigate(['admin', 'locations', locationDto.id]);
  }

  private getDialogConfig() {
    return {
      autoFocus: true,
      data: {
        locationDto: this.locationDto
      }
    };
  }

  openAddLocationFormDialog() {
    const dialogRef = this.dialog.open(LocationFormComponent, this.getDialogConfig());

    dialogRef.afterClosed().subscribe(
      locationDto => {
        if (locationDto) {
          this.locationsDto = [...this.locationsDto, locationDto];
          this.notificationService.success("Cadastrado com sucesso");
        }
      }
    );
  }
}
