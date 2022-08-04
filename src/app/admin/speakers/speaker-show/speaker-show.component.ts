import { Component, OnInit } from '@angular/core';
import { SpeakerDto } from "../../../core/models/speaker.model";
import { SpeakerService } from "../../../core/services/speaker.service";
import { ActivatedRoute, Router } from "@angular/router";
import { LoaderService } from "../../loader.service";
import { NotificationService } from "../../../core/services/notification.service";
import { first } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "../../../core/components/confirmation-dialog/confirmation-dialog.component";
import { HttpErrorResponse } from "@angular/common/http";
import { ProblemDetail } from "../../../core/models/problem-detail";

@Component({
  selector: 'app-speaker-show',
  templateUrl: './speaker-show.component.html',
  styleUrls: ['./speaker-show.component.scss']
})
export class SpeakerShowComponent implements OnInit {
  speakerDto: SpeakerDto;
  speakerId: string;

  constructor(
    private speakerService: SpeakerService,
    private route: ActivatedRoute,
    private router: Router,
    private loaderService: LoaderService,
    private notificationService: NotificationService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loaderService.show()
    this.speakerId = this.route.snapshot.paramMap.get('speakerId');
    this.fetchSpeaker(this.speakerId);
  }

  private fetchSpeaker(speakerId: string) {
    this.speakerService.getSpeakerById(speakerId)
      .pipe(first())
      .subscribe({
        next: speakerDto => {
          this.speakerDto = speakerDto;
          this.loaderService.hide();
        }
      })
  }

  backLink() {
    return this.router.navigate(['admin', 'speakers']);
  }

  private getConfirmationDialogConfig() {
    return {
      autoFocus: true,
      data: {
        name: "Excluir ministrante",
        text: `O ministrante ${this.speakerDto.name} será excluido de forma definitiva.`,
        cancelText: "Cancelar",
        okText: "Excluir"
      }
    };
  }

  openDeleteConfirmationDialog() {
    this.dialog.open(ConfirmationDialogComponent, this.getConfirmationDialogConfig())
      .afterClosed()
      .subscribe({
        next: result => {
          if (result) {
            this.deleteSubevent();
          }
        }
      });
  }

  deleteSubevent() {
    this.speakerService.deleteSpeaker(this.speakerId)
      .pipe(first())
      .subscribe({
        next: () => {
          this.notificationService.success("Ministrante excluído com sucesso");
          return this.router.navigate(['admin', 'speakers'])
        },
        error: error => this.handleError(error)
      });
  }

  handleError(error: any) {
    if(error instanceof HttpErrorResponse) {
      if(error.status === 409) {
        const problem: ProblemDetail = error.error;
        this.notificationService.error(problem.violations[0].message);
      }
    }
  }
}
