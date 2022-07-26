import { Component, OnInit } from '@angular/core';
import {SubeventDto} from "../../../../core/models/subevent.model";
import {SubeventService} from "../../../../core/services/subevent.service";
import {ActivatedRoute} from "@angular/router";
import {first} from "rxjs";

@Component({
  selector: 'app-subevent-show',
  templateUrl: './subevent-show.component.html',
  styleUrls: ['./subevent-show.component.scss']
})
export class SubeventShowComponent implements OnInit {

  subeventDto: SubeventDto;
  subeventId: string;
  eventId: string;

  constructor(
    private subeventService: SubeventService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    this.subeventId = this.route.snapshot.paramMap.get('subeventId');

    this.fetchSubevent(this.eventId, this.subeventId);
  }

  fetchSubevent(eventId: string, subeventId: string) {
    this.subeventService.getSubeventById(eventId, subeventId)
      .pipe(first())
      .subscribe(
        subeventDto => {
          this.subeventDto = subeventDto;
        }
      )
  }
}
