import { Component, OnInit } from '@angular/core';
import { EventDto } from "../../../../core/models/event.model";
import { SubeventDto } from "../../../../core/models/subevent.model";
import { ActivatedRoute } from "@angular/router";
import { SubeventDtoResolved } from "../../../../core/resolvers/subevent.resolver";
import { OrganizerService } from "../../../../core/services/organizer.service";
import { OrganizerSubeventService } from "../../../../core/services/organizer-subevent.service";
import { first } from "rxjs";
import { OrganizerDto, OrganizerSiteDto } from "../../../../core/models/organizer.model";
import { SiteService } from "../../../services/site.service";

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
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private siteService: SiteService,

  ) {
    this.eventDto = this.route.parent.snapshot.data['event'];

    if(this.eventDto) {
      this.fetchEventOrganizers()
    } else {
      this.eventMode = false;
      const subeventDtoResolved: SubeventDtoResolved = this.route.parent.snapshot.data['subevent'];
      this.eventDto = subeventDtoResolved.eventDto;
      this.subeventDto = subeventDtoResolved.subeventDto;
      this.fetchSubEventOrganizers()
    }
  }

  ngOnInit(): void {
  }

  private fetchEventOrganizers() {
    this.siteService.getOrganizers(this.eventDto.id)
      .pipe(first())
      .subscribe({
        next: organizers => {
          this.organizers = organizers
          this.groupOrganizers = this.groupOrganizersReduce(this.organizers);
          document.title = `${this.eventDto.title} - Organização`;
          this.loading = false;
        }
      })
  }

  private fetchSubEventOrganizers() {
    this.siteService.getOrganizersSubevent(this.eventDto.id, this.subeventDto.id)
      .pipe(first())
      .subscribe({
        next: organizers => {
          this.organizers = organizers
          this.groupOrganizers = this.groupOrganizersReduce(this.organizers);
          document.title = `${this.eventDto.title} - ${this.subeventDto.title} - Organização`;
          this.loading = false;
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
