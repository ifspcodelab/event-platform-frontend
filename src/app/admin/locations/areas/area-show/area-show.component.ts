import { SpaceService } from '../../../../core/services/space.service';
import { SpaceDto } from '../../../../core/models/space.model';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaService } from '../../../../core/services/area.service';
import { AreaDto } from '../../../../core/models/area.model';
import { Component, OnInit } from '@angular/core';
import {SpacesFormComponent} from "../../spaces/spaces-form/spaces-form.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-area-show',
  templateUrl: './area-show.component.html',
  styleUrls: ['./area-show.component.scss']
})
export class AreaShowComponent implements OnInit {
  locationId: string;
  areaId: string;
  areaDto: AreaDto;
  spacesDto: SpaceDto[];
  displayedColumns: string[] = ['name', 'capacity', 'type'];


  constructor(
    private areaService: AreaService,
    private spaceService: SpaceService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.locationId = this.route.snapshot.paramMap.get('locationId');
    this.areaId = this.route.snapshot.paramMap.get('areaId');
    this.fetchArea(this.locationId, this.areaId);
  }

  fetchArea(locationId: string, areaId: string) {
    this.areaService.getAreaById(locationId, areaId)
      .pipe(first())
      .subscribe(
        areaDto => {
          this.areaDto = areaDto;
          this.fetchSpaces(locationId, areaId)
        }
      )
  }

  fetchSpaces(locationId: string, areaId: string) {
    this.spaceService.getSpaces(locationId, areaId)
      .pipe(first())
      .subscribe(
        spacesDto => {
          this.spacesDto = spacesDto;
        }
      )
  }

  openSpaceFormDialog() {
    const dialogRef = this.dialog.open(SpacesFormComponent, this.getDialogConfig());
    dialogRef.afterClosed().subscribe( spaceDto => {
      if(spaceDto) {
        this.spacesDto = [...this.spacesDto, spaceDto];
      }
    });
  }

  private getDialogConfig() {
    return {
      autoFocus: true,
      data: {
        locationId: this.locationId,
        areaId: this.areaId
      }
    };
  }

  openSpaceShow(spaceDto: SpaceDto) {
    this.router.navigate(['admin', 'locations', this.locationId, 'areas', this.areaId, 'spaces', spaceDto.id]);
  }
}
