import { Component, OnInit } from '@angular/core';
import { SpaceDto } from "../../../../core/models/space.model";
import { ActivatedRoute, Router } from "@angular/router";
import { SpaceService } from "../../../../core/services/space.service";
import { first } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { SpaceFormComponent } from "../space-form/space-form.component";
import { NotificationService } from "../../../../core/services/notification.service";
import { ConfirmationDialogComponent } from "../../../../core/components/confirmation-dialog/confirmation-dialog.component";
import { LoaderService } from "../../../loader.service";
import { HttpErrorResponse } from "@angular/common/http";

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
    public dialog: MatDialog,
    private loaderService: LoaderService,
  ) { }

  ngOnInit(): void {
    this.loaderService.show()
    this.locationId = this.route.snapshot.paramMap.get('locationId');
    this.areaId = this.route.snapshot.paramMap.get('areaId');
    this.spaceId = this.route.snapshot.paramMap.get('spaceId');
    this.fetchSpace(this.locationId, this.areaId, this.spaceId);
  }

  fetchSpace(locationId: string, areaId: string, spaceId: string) {
    this.spaceService.getSpaceById(locationId, areaId, spaceId)
      .pipe(first())
      .subscribe(spaceDto => {
        this.spaceDto = spaceDto
        this.loaderService.hide();
      });
  }

  openAreaShow() {
    this.router.navigate(['admin', 'locations', this.locationId, 'areas', this.areaId]);
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

  openEditSpaceFormDialog() {
    this.dialog.open(SpaceFormComponent, this.getDialogConfig())
    .afterClosed()
      .subscribe(spaceDto => {
        if (spaceDto) {
          this.spaceDto = spaceDto;
          this.notificationService.success("Espaço editado com sucesso");
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
    this.dialog.open(ConfirmationDialogComponent, this.getConfirmationDialogConfig())
    .afterClosed()
    .subscribe(result => this.deleteSpace(result));
  }

  deleteSpace(result: any) {
    if (result) {
      this.spaceService.deleteSpace(this.locationId, this.areaId, this.spaceId)
        .pipe(first())
        .subscribe( {
          next: _ => {
            this.notificationService.success("Espaço excluido com sucesso");
            this.router.navigate(['admin', 'locations', this.locationId, 'areas', this.areaId]);
          },
          error: error => { 
            if(error instanceof HttpErrorResponse) {
              if(error.status === 409) {
                if(error.error.violations[1].name === "Session schedule") {
                  this.notificationService.error("Não é possível excluir um espaço que está associado a um horário de uma sessão");
                }
              }
            }
          }
        });
    }
  }
}

