import { Component, OnInit } from '@angular/core';
import { ActivityDto } from "../../../../core/models/activity.model";
import { EventStatusModel } from "../../../../core/models/event-status.model";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-activity-show',
  templateUrl: './activity-show.component.html',
  styleUrls: ['./activity-show.component.scss']
})
export class ActivityShowComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title'];
  eventId: string = null;
  subEventId: string = null;

  activityDto: ActivityDto = {
    id: "e93bee36-e1cb-4ce7-8ab6-64039a183875",
    title: "Novidades Java 17",
    slug: "novidades-java-17",
    description: "Saiu recentemente a nova versão LTS (Long Term Support) do Java. Essas versões são as mais importantes no calendário de lançamentos, uma vez que possuem oito anos de suporte.",
    status: EventStatusModel.DRAFT,
  }
  sessionsDto: any[] = [
    {
      id: "ccee36f9-027f-48ba-917d-22893c00cdad",
      seats: "30",
    }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    this.subEventId = this.route.snapshot.paramMap.get('subeventId');
  }

  openEventShow() {
    return this.router.navigate(['admin', 'events', this.eventId], { queryParams: { tab: 2 } });
  }

  publishActivity() {

  }

  unpublishActivity() {

  }

  cancelActivity() {

  }

  openDeleteConfirmationDialog() {

  }

  openSessionShow(row: any) {
    console.log(this.subEventId)
    if (this.subEventId) {
      return this.router.navigate(
        ['admin', 'events', this.eventId, 'sub-events', this.subEventId, 'activities', this.activityDto.id, 'sessions', row.id]
      );
    }

    return this.router.navigate(
      ['admin', 'events',  this.eventId, 'activities', this.activityDto.id, 'sessions', row.id]
    );
  }

  showActions() {
    return this.activityDto.status !== EventStatusModel.CANCELED;
  }

  showPublishButton() {
    return this.activityDto.status == EventStatusModel.DRAFT;
  }

  showUnpublishedButton() {
    return this.activityDto.status == EventStatusModel.PUBLISHED;
  }

}
