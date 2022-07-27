import { Component, OnInit } from '@angular/core';
import {SpaceDto} from "../../../../core/models/space.model";
import {ActivatedRoute} from "@angular/router";
import {SpaceService} from "../../../../core/services/space.service";
import {first} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {SpacesFormComponent} from "../spaces-form/spaces-form.component";


@Component({
  selector: 'app-space-show',
  templateUrl: './space-show.component.html',
  styleUrls: ['./space-show.component.scss']
})
export class SpaceShowComponent implements OnInit {
  locationId: string;
  areaId: string;
  spaceId: string;
  spaceDto: SpaceDto;

  constructor(
    private spaceService: SpaceService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.locationId = this.route.snapshot.paramMap.get('locationId');
    this.areaId = this.route.snapshot.paramMap.get('areaId');
    this.spaceId = this.route.snapshot.paramMap.get('spaceId');

      this.fetchSpace(this.locationId, this.areaId, this.spaceId);
  }

  fetchSpace(locationId: string, areaId: string, spaceId: string) {
    this.spaceService.getSpaceById(locationId, areaId, spaceId)
      .pipe(first())
      .subscribe(
        spaceDto => {
          this.spaceDto = spaceDto;
        }
      )
  }

  openEditFormDialog() {
      const dialogRef = this.dialog.open(SpacesFormComponent, this.getDialogConfig());

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }

  private getDialogConfig() {
    return {
      autoFocus: true,
      data: {
        locationId: this.locationId,
        areaId: this.areaId,
        spaceDto: this.spaceDto
      }
    };
  }
}
