import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  EventAndSubeventListComponent
} from "./events-and-subevents/event-and-subevent-list/event-and-subevent-list.component";
import { EventShowComponent } from "./events/event-show/event-show.component";
import { SubeventShowComponent } from "./subevents/subevent-show/subevent-show.component";
import { SessionShowComponent } from "./sessions/session-show/session-show.component";
import { EventsComponent } from "./events.component";

const routes: Routes = [
  {
    path: '',
    component: EventsComponent,
    children: [
      { path: '', component: EventAndSubeventListComponent },
      { path: ':eventId', component: EventShowComponent },
      { path: ':eventId/sub-events/:subeventId', component: SubeventShowComponent },
      { path: ':eventId/sub-events/:subeventId/sessions/:sessionId', component: SessionShowComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
