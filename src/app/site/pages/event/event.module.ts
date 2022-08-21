import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { EventComponent } from './event/event.component';
import { EventPresentationComponent } from './event-presentation/event-presentation.component';
import { EventSubeventsComponent } from './event-subevents/event-subevents.component';
import { SubeventComponent } from './subevent/subevent.component';
import {SiteModule} from "../../site.module";
import {SharedModule} from "../../../shared/shared.module";
import { SubeventPresentationComponent } from "./subevent-presentation/subevent-presentation.component";
import { EventContactComponent } from './event-contact/event-contact.component';
import { SubeventContactComponent } from './subevent-contact/subevent-contact.component';


@NgModule({
  declarations: [
    EventComponent,
    EventPresentationComponent,
    EventSubeventsComponent,
    EventContactComponent,
    SubeventComponent,
    SubeventPresentationComponent,
    SubeventContactComponent,
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
    SiteModule,
    SharedModule
  ]
})
export class EventModule { }
