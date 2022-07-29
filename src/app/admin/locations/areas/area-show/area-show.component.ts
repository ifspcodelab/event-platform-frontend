import { SpaceService } from '../../../../core/services/space.service';
import { SpaceDto } from '../../../../core/models/space.model';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaService } from '../../../../core/services/area.service';
import { AreaDto } from '../../../../core/models/area.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SpacesFormComponent } from "../../spaces/space-form/spaces-form.component";
import { MatDialog } from "@angular/material/dialog";
import { NotificationService } from "../../../../core/services/notification.service";
import { MatSort, Sort } from "@angular/material/sort";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: 'app-area-show',
  templateUrl: './area-show.component.html',
  styleUrls: ['./area-show.component.scss']
})
export class AreaShowComponent implements OnInit {
  locationId: string;
  areaId: string;
  areaDto: AreaDto;
  spacesDto: SpaceDto[] = [];
  dataSource: MatTableDataSource<SpaceDto>;
  displayedColumns: string[] = ['name', 'capacity', 'type'];
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(
    private areaService: AreaService,
    private spaceService: SpaceService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private _liveAnnouncer: LiveAnnouncer
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
          this.dataSource = new MatTableDataSource<SpaceDto>(this.spacesDto);
        }
      )
  }

  openAddSpaceFormDialog() {
    const dialogRef = this.dialog.open(SpacesFormComponent, this.getDialogConfig());
    dialogRef.afterClosed().subscribe( spaceDto => {
      if(spaceDto) {
        this.notificationService.success("Cadastrado com sucesso");
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

  announceSortChange(sort: Sort) {
    this.dataSource.sort = this.sort;

    if (sort.direction) {
      this._liveAnnouncer.announce(`Sorted ${sort.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  openSpaceShow(spaceDto: SpaceDto) {
    this.router.navigate(['admin', 'locations', this.locationId, 'areas', this.areaId, 'spaces', spaceDto.id]);
  }
}
