import { LocationService } from './../../../../core/services/location.service';
import { LocationDto } from './../../../../core/models/location.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from "rxjs/operators";

@Component({
  selector: 'app-location-show',
  templateUrl: './location-show.component.html',
  styleUrls: ['./location-show.component.scss']
})
export class LocationShowComponent implements OnInit {
  locationDto?: LocationDto | null;
  locationId?: string | null;

  constructor(
    private locationService: LocationService,
    private route: ActivatedRoute
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
      }
    )
  }

}
