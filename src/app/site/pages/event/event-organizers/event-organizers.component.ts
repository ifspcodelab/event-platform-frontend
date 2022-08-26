import { Component, OnInit } from '@angular/core';
import { EventDto } from "../../../../core/models/event.model";
import { SubeventDto } from "../../../../core/models/subevent.model";
import { ActivatedRoute } from "@angular/router";
import { SubeventDtoResolved } from "../../../../core/resolvers/subevent.resolver";
import { OrganizerService } from "../../../../core/services/organizer.service";
import { OrganizerSubeventService } from "../../../../core/services/organizer-subevent.service";
import { first } from "rxjs";
import { OrganizerDto, OrganizerSiteDto } from "../../../../core/models/organizer.model";

@Component({
  selector: 'app-event-organizers',
  templateUrl: './event-organizers.component.html',
  styleUrls: ['./event-organizers.component.scss']
})
export class EventOrganizersComponent implements OnInit {
  eventDto: EventDto;
  subeventDto: SubeventDto;
  eventMode: boolean = true;
  organizers: OrganizerSiteDto[] = [];
  groupOrganizers: any[] = [];
  Object = Object;

  constructor(
    private route: ActivatedRoute,
    private organizerEventService: OrganizerService,
    private organizerSubEventService: OrganizerSubeventService,

  ) {
    this.eventDto = this.route.parent.snapshot.data['event'];

    if(this.eventDto) {
      document.title = `${this.eventDto.title} - Programação`;
      this.fetchEventOrganizers()
    } else {
      this.eventMode = false;
      const subeventDtoResolved: SubeventDtoResolved = this.route.parent.snapshot.data['subevent'];
      this.eventDto = subeventDtoResolved.eventDto;
      this.subeventDto = subeventDtoResolved.subeventDto;
      document.title = `${this.subeventDto.title} - Programação`;
      this.fetchSubEventOrganizers()
    }
  }

  ngOnInit(): void {
  }

  private fetchEventOrganizers() {
    this.organizerEventService.getOrganizersForSite(this.eventDto.id)
      .pipe(first())
      .subscribe({
        next: organizers => {
          this.organizers = organizers
          this.groupOrganizers = this.groupOrganizersReduce(this.organizers);
        }
      })
  }

  private fetchSubEventOrganizers() {
    this.organizerSubEventService.getOrganizersSubeventForSite(this.eventDto.id, this.subeventDto.id)
      .pipe(first())
      .subscribe({
        next: organizers => {
          this.organizers = organizers
          this.groupOrganizers = this.groupOrganizersReduce(this.organizers);
        }
      })
  }

  private groupOrganizersReduce(organizerSiteDtos: OrganizerSiteDto[]): any[] {
    return organizerSiteDtos.reduce((acc: any, item)=> {
      acc[item.organizerType] = acc[item.organizerType] || [];
      acc[item.organizerType].push(item);
      return acc;
    }, {});
  }
}
