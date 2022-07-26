import { AreaFormComponent } from './../../areas/area-form/area-form.component';
import { AreaService } from './../../../../core/services/area.service';
import { AreaDto } from './../../../../core/models/area.model';
import { LocationService } from './../../../../core/services/location.service';
import { LocationDto } from './../../../../core/models/location.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { first } from "rxjs/operators";

@Component({
  selector: 'app-location-show',
  templateUrl: './location-show.component.html',
  styleUrls: ['./location-show.component.scss']
})
export class LocationShowComponent implements OnInit {
  locationId?: string | null;
  locationDto?: LocationDto | null;
  areasDto: AreaDto[] = [];
  displayedColumns: string[] = ['name', 'reference'];

  constructor(
    private locationService: LocationService,
    private areaService: AreaService,
    private route: ActivatedRoute,
    private router: Router,
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
          console.log(locationDto);
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
          console.log(areasDto);
        }
      )
  }

  openAreaShow(areaDto: AreaDto) {
    console.log(areaDto);
    this.router.navigate(['admin', 'locations', this.locationId, 'areas', areaDto.id]);
  }

  private getDialogConfig(locationDto?: LocationDto) {
    return {
      autoFocus: true,
      data: {
        locationDto: this.locationDto
      }
    };
  }

  openFormAreaDialog() {
    const dialogRef = this.dialog.open(AreaFormComponent, this.getDialogConfig(undefined));

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
