import { Component, OnInit } from '@angular/core';
import {SpaceDto} from "../../../../core/models/space.model";
import {ActivatedRoute} from "@angular/router";
import {SpaceService} from "../../../../core/services/space.service";
import {first} from "rxjs";
import {AreaDto} from "../../../../core/models/area.model";

@Component({
  selector: 'app-space-show',
  templateUrl: './space-show.component.html',
  styleUrls: ['./space-show.component.scss']
})
export class SpaceShowComponent implements OnInit {
  locationId?: string | null;
  areaId?: string | null;
  spaceId?: string | null;
  areaDto?: AreaDto | null;
  spaceDto?: SpaceDto | null;

  constructor(
    private spaceService: SpaceService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.locationId = this.route.snapshot.paramMap.get('locationId');
    this.areaId = this.route.snapshot.paramMap.get('areaId');
    this.spaceId = this.route.snapshot.paramMap.get('spaceId');

    if (this.spaceId) {
      this.fetchSpace(this.locationId, this.areaId, this.spaceId);
    }
  }

  fetchSpace(locationId: string | null, areaId: string | null, spaceId: string) {
    this.spaceService.getSpaceById(locationId, areaId, spaceId)
      .pipe(first())
      .subscribe(
        spaceDto => {
          this.spaceDto = spaceDto;
          console.log(spaceDto);
        }
      )
  }
}
