import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './event/event.component';
import { EventPresentationComponent } from "./event-presentation/event-presentation.component";
import { EventSubeventsComponent } from "./event-subevents/event-subevents.component";
import { SubeventComponent } from "./subevent/subevent.component";
import { SubeventPresentationComponent } from "./subevent-presentation/subevent-presentation.component";
import { EventResolver } from "../../../core/resolvers/event.resolver";
import { SubeventResolver } from "../../../core/resolvers/subevent.resolver";
import { EventContactComponent } from "./event-contact/event-contact.component";
import { SubeventContactComponent } from "./subevent-contact/subevent-contact.component";
import { EventScheduleComponent } from "./event-schedule/event-schedule.component";
import { ActivityShowComponent } from "./activity-show/activity-show.component";
import { EventOrganizersComponent } from "./event-organizers/event-organizers.component";

const routes: Routes = [
  {
    path: ':eventSlug',
    component: EventComponent,
    resolve: { event: EventResolver },
    children: [
      { path: '', redirectTo: 'presentation', pathMatch: 'full' },
      { path: 'presentation', component: EventPresentationComponent },
      { path: 'sub-events', component: EventSubeventsComponent },
      { path: 'schedule', component: EventScheduleComponent },
      { path: 'organization', component: EventOrganizersComponent },
      { path: 'contact', component: EventContactComponent },
      { path: 'activities/:activitySlug', component: ActivityShowComponent },
    ]
  },
  {
    path: ':eventSlug/sub-events/:subeventSlug',
    component: SubeventComponent,
    resolve: { subevent: SubeventResolver },
    children: [
      { path: '', redirectTo: 'presentation', pathMatch: 'full' },
      { path: 'presentation', component: SubeventPresentationComponent },
      { path: 'schedule', component: EventScheduleComponent },
      { path: 'organization', component: EventOrganizersComponent },
      { path: 'contact', component: SubeventContactComponent },
      { path: 'activities/:activitySlug', component: ActivityShowComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
