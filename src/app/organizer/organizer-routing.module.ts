import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizerComponent } from './organizer.component';
import {
  EventAndSubeventListComponent
} from "./events-and-subevents/event-and-subevent-list/event-and-subevent-list.component";
import { SessionListComponent } from "./sessions/session-list/session-list.component";
import { SessionShowComponent } from "./sessions/session-show/session-show.component";
import { EventShowComponent } from "./events/event-show/event-show.component";

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
        path: 'events/:eventId',
        component: SessionListComponent,
      },
      {
        path: 'events/:eventId/sub-events',
        component: EventShowComponent,
      },
      {
        path: 'sub-events/:subeventId',
        component: SessionListComponent,
      },
      {
        path: 'events/:eventId/sessions/:sessionId',
        component: SessionShowComponent,
      },
      {
        path: 'sub-events/:subeventId/:sessionId',
        component: SessionShowComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizerRoutingModule { }
