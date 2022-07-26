import { AreaService } from './../../../../core/services/area.service';
import { AreaDto } from './../../../../core/models/area.model';
import { LocationService } from './../../../../core/services/location.service';
import { LocationDto } from './../../../../core/models/location.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from "rxjs/operators";

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

  constructor(
    private locationService: LocationService,
    private areaService: AreaService,
    private route: ActivatedRoute,
    private router: Router
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

  openAreaShow(areaDto: AreaDto) {
    this.router.navigate(['admin', 'locations', this.locationId, 'areas', areaDto.id]);
  }

}
