import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { EventShowComponent } from './events/event-show/event-show.component';
import { EventStatusPipe } from "../../core/pipes/event-status.pipe";
import { SubeventShowComponent } from './subevents/subevent-show/subevent-show.component';
import { SubeventsFormComponent } from './subevents/subevents-form/subevents-form.component';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [
    EventsComponent,
    EventListComponent,
    EventShowComponent,
    EventStatusPipe,
    SubeventShowComponent,
    SubeventsFormComponent,
  ],
    imports: [
        CommonModule,
        EventsRoutingModule,
        MatTableModule,
        MatButtonModule,
        MatListModule,
        MatIconModule,
        MatCardModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        CoreModule
    ]
})
export class EventsModule { }
