import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AreaService } from './../../../../core/services/area.service';
import { AreaDto } from './../../../../core/models/area.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-area-show',
  templateUrl: './area-show.component.html',
  styleUrls: ['./area-show.component.scss']
})
export class AreaShowComponent implements OnInit {
  locationId?: string | null;
  areaId?: string | null;
  areaDto?: AreaDto | null;

  constructor(
    private areaService: AreaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.locationId = this.route.snapshot.paramMap.get('locationId');
    this.areaId = this.route.snapshot.paramMap.get('areaId');

    if(this.areaId) {
      this.fetchArea(this.locationId, this.areaId);
    }
  }

  fetchArea(locationId?: string | null, areaId?: string | null) {
    this.areaService.getAreaById(locationId, areaId)
      .pipe(first())
      .subscribe(
        areaDto => {
          this.areaDto = areaDto;
          console.log(areaDto);
        }
      )
  }

}
