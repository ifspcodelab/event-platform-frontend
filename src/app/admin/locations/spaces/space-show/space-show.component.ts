import { Component, OnInit } from '@angular/core';
import { SpaceDto } from "../../../../core/models/space.model";
import {ActivatedRoute, Router} from "@angular/router";
import { SpaceService } from "../../../../core/services/space.service";
import { first } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { SpacesFormComponent } from "../spaces-form/spaces-form.component";
import {NotificationService} from "../../../../core/services/notification.service";
import {
  ConfirmationDialogComponent
} from "../../../../core/components/confirmation-dialog/confirmation-dialog.component";


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
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
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

  openSpaceFormDialog() {
    const dialogRef = this.dialog.open(SpacesFormComponent, this.getDialogConfig());
    dialogRef.afterClosed().subscribe( spaceDto => {
      if(spaceDto) {
        this.spaceDto = spaceDto;
      }
    });
  }

  private getConfirmationDialogConfig() {
    return {
      autoFocus: true,
      data: {
        name: "Excluir espaço",
        text: `O espaço ${this.spaceDto.name} será excluido de forma definitiva`,
        cancelText: "Cancelar",
        okText: "Excluir"
      }
    };
  }

  openDeleteConfirmationDialog() {
    // verificar se existe alguma área associada - location
    // verificar se existe algum espaço associado - area
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,  this.getConfirmationDialogConfig());
    dialogRef.afterClosed().subscribe( result => {
      if (result) {
        this.spaceService.deleteSpace(this.locationId, this.areaId, this.spaceId)
          .pipe(first())
          .subscribe( _ => {
            this.notificationService.success("Excluido com sucesso");
            this.router.navigate(['admin', 'locations', this.locationId, 'areas', this.areaId])
          }, error => {

          })
      }
    })

  }
}
