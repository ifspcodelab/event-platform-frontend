import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { EventListComponent } from './events/event-list/event-list.component';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    EventsComponent,
    EventListComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    MatTableModule,
    MatButtonModule
  ]
})
export class EventsModule { }
