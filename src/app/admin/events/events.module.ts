import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { EventShowComponent } from './events/event-show/event-show.component';
import { EventStatusPipe } from "../../core/pipes/event-status.pipe";
import { SubeventShowComponent } from './subevents/subevent-show/subevent-show.component';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    EventsComponent,
    EventListComponent,
    EventShowComponent,
    EventStatusPipe,
    SubeventShowComponent
  ],
  imports: [
    CommonModule,
    DatePipe,
    EventsRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatCardModule
  ]
})
export class EventsModule { }
