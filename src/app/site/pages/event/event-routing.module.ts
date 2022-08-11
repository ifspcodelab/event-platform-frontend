import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './event/event.component';
import { EventPresentationComponent } from "./event-presentation/event-presentation.component";
import { EventSubeventsComponent } from "./event-subevents/event-subevents.component";
import { SubeventComponent } from "./subevent/subevent.component";

const routes: Routes = [
   {
    path: ':eventSlug',
    component: EventComponent,
    children: [
      { path: '', redirectTo: 'presentation', pathMatch: 'full' },
      { path: 'presentation', component: EventPresentationComponent },
      { path: 'subevents', component: EventSubeventsComponent },
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
