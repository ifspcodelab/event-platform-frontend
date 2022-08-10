import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './event/event.component';
import { EventPresentationComponent } from "./event-presentation/event-presentation.component";
import { EventSubeventsComponent } from "./event-subevents/event-subevents.component";
import { SubeventComponent } from "./subevent/subevent.component";

const routes: Routes = [
  {
    path: '',
    component: EventComponent,
    children: [
      { path: ':eventSlug', component: EventPresentationComponent },
      { path: ':eventSlug/subevents', component: EventSubeventsComponent },
    ]
  },
  {
    path: ':eventSlug/subevents/:subeventSlug',
    component: SubeventComponent,
    children: [
      { path: 'presentation', component: EventPresentationComponent },
      { path: 'schedule', component: EventSubeventsComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
