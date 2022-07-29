import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events.component';
import { EventListComponent } from "./events/event-list/event-list.component";
import { EventFormComponent } from "./events/event-form/event-form.component";
import { EventShowComponent } from "./events/event-show/event-show.component";
import { SubeventShowComponent } from "./subevents/subevent-show/subevent-show.component";

const routes: Routes = [
  {
    path: '',
    component: EventsComponent,
    children: [
      { path: '', component: EventListComponent },
      { path: 'new', component: EventFormComponent },
      { path: ':eventId', component: EventShowComponent },
      { path: ':eventId/edit', component: EventFormComponent },
      { path: ':eventId/sub-events/:subeventId', component: SubeventShowComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
