import { Component, OnInit } from '@angular/core';
import { LocationDto } from 'src/app/core/models/location.model';
import { LocationService } from 'src/app/core/services/location.service';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.scss']
})
export class LocationListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'address'];
  dataSource: LocationDto[] = [];
  

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {

    this.locationService.getLocations().subscribe(
      locations => {
        this.dataSource = locations;
      }
    )
  }

}
