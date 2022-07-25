import { Component, OnInit } from '@angular/core';
import { LocationDto } from 'src/app/core/models/location.model';
import { LocationService } from 'src/app/core/services/location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'address'];
  dataSource: LocationDto[] = [];


  constructor(
    private locationService: LocationService,
    private router: Router
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

}
