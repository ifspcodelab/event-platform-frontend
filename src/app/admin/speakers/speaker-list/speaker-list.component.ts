import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from "@angular/material/sort";
import { SpeakerDto } from "../../../core/models/speaker.model";
import { SpeakerService } from "../../../core/services/speaker.service";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { LoaderService } from "../../loader.service";

@Component({
  selector: 'app-speaker-list',
  templateUrl: './speaker-list.component.html',
  styleUrls: ['./speaker-list.component.scss']
})
export class SpeakerListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'phoneNumber', 'cpf', 'account'];
  speakersDto: SpeakerDto[] = [];
  dataSource: MatTableDataSource<SpeakerDto>;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(
    private speakerService: SpeakerService,
    private loaderService: LoaderService,
    private _liveAnnouncer: LiveAnnouncer,
  ) { }

  ngOnInit(): void {
    this.loaderService.show();
    this.fetchSpeakers();
  }

  fetchSpeakers() {
    this.speakerService.getSpeakers()
      .subscribe(
        pageDto => {
          this.speakersDto = pageDto.content;
          this.dataSource = new MatTableDataSource<SpeakerDto>(this.speakersDto);
          this.loaderService.hide();
        }
    )
  }

  announceSortChange(sort: Sort) {
    this.dataSource.sort = this.sort;

    if (sort.direction) {
      this._liveAnnouncer.announce(`Ordenado ${sort.direction}final`);
    } else {
      this._liveAnnouncer.announce('Ordenação removida');
    }
  }

  openSpeakerShow(speakerDto: SpeakerDto) {
    console.log(speakerDto);
  }
}
