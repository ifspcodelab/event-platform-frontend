import { SpaceService } from '../../../../core/services/space.service';
import { SpaceDto } from './../../../../core/models/space.model';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
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
  spacesDto: SpaceDto[] = [];
  displayedColumns: string[] = ['name', 'capacity', 'type'];


  constructor(
    private areaService: AreaService,
    private spaceService: SpaceService,
    private route: ActivatedRoute,
    private router: Router
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
          this.fetchSpaces(this.locationId, this.areaId)
        }
      )
  }

  fetchSpaces(locationId?: string | null, areaId?: string | null) {
    this.spaceService.getSpaces(locationId, areaId)
      .pipe(first())
      .subscribe(
        spacesDto => {
          this.spacesDto = spacesDto;
          console.log(spacesDto);
        }
      )
  }

  openSpaceShow(spaceDto: SpaceDto) {
    console.log(spaceDto);
    this.router.navigate(['admin', 'locations', this.locationId, 'areas', this.areaId, 'spaces', spaceDto.id]);
  }
}
