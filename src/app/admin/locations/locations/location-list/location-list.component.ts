import { Component, OnInit } from '@angular/core';
import { LocationDto } from 'src/app/core/models/location.model';
import { LocationService } from 'src/app/core/services/location.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LocationFormComponent } from '../location-form/location-form.component';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit {
  locationDto: LocationDto;
  displayedColumns: string[] = ['name', 'address'];
  dataSource: LocationDto[] = [];


  constructor(
    private locationService: LocationService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.locationService.getLocations().subscribe(
      locations => {
        this.dataSource = locations;
      }
    )
  }

  openLocationShow(locationDto: LocationDto) {
    console.log(locationDto);
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

  openFormLocationDialog() {
    const dialogRef = this.dialog.open(LocationFormComponent, this.getDialogConfig());

    dialogRef.afterClosed().subscribe(locationDto => {
      if (locationDto) {
        this.dataSource = [...this.dataSource, locationDto];
      }
    });
  }
}
