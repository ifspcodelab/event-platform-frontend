import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizerComponent } from './organizer.component';
import {
  EventAndSubeventListComponent
} from "./events-and-subevents/event-and-subevent-list/event-and-subevent-list.component";
import { SessionListComponent } from "./sessions/session-list/session-list.component";
import { SessionShowComponent } from "../admin/events/sessions/session-show/session-show.component";
import { SessionListPrintComponent } from "./sessions/session-list-print/session-list-print.component";

const routes: Routes = [
  {
    path: '',
    component: OrganizerComponent,
    children: [
      {
        path: '',
        redirectTo: 'events-and-subevents',
        pathMatch: 'full',
      },
      {
        path: 'events-and-subevents',
        component: EventAndSubeventListComponent,
      },
      {
        path: 'events/:eventId/sessions',
        component: SessionListComponent,
      },
      {
        path: 'events/:eventId/sub-events/:subeventId/sessions',
        component: SessionListComponent,
      },
      {
        path: 'events/:eventId/activities/:activityId/sessions/:sessionId',
        component: SessionShowComponent,
      },
      {
        path: 'events/:eventId/sub-events/:subeventId/activities/:activityId/sessions/:sessionId',
        component: SessionShowComponent,
      }
    ]
  },
  {
    path: 'print/events/:eventId/activities/:activityId/sessions/:sessionId',
    component: SessionListPrintComponent,
  },
  {
    path: 'print/events/:eventId/sub-events/:subeventId/activities/:activityId/sessions/:sessionId',
    component: SessionListPrintComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizerRoutingModule { }
