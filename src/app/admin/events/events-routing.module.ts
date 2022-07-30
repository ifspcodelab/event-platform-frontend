import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events.component';
import { EventListComponent } from "./events/event-list/event-list.component";
import { EventShowComponent } from "./events/event-show/event-show.component";
import { SubeventShowComponent } from "./subevents/subevent-show/subevent-show.component";
import { SubeventsFormComponent } from "./subevents/subevents-form/subevents-form.component";

const routes: Routes = [
  {
    path: '',
    component: EventsComponent,
    children: [
      { path: '', component: EventListComponent },
      { path: ':eventId', component: EventShowComponent },
      { path: ':eventId/sub-events/new', component: SubeventsFormComponent },
      { path: ':eventId/sub-events/:subeventId', component: SubeventShowComponent },
      { path: ':eventId/sub-events/:subeventId/edit', component: SubeventsFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
