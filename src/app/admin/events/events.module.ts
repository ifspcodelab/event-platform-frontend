import { OrganizerSubeventFormComponent } from './subevents/organizer-subevent-form/organizer-subevent-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from "../../core/core.module";
import { SharedModule } from "../../shared/shared.module";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { EventShowComponent } from './events/event-show/event-show.component';
import { EventFormComponent } from './events/event-form/event-form.component';
import { SubeventShowComponent } from './subevents/subevent-show/subevent-show.component';
import { SubeventsFormComponent } from "./subevents/subevents-form/subevents-form.component";
import { ActivityShowComponent } from "./activities/activity-show/activity-show.component";
import { ActivityFormComponent } from './activities/activity-form/activity-form.component';
import { ActivityListComponent } from './activities/activity-list/activity-list.component';
import { ActivitySpeakersComponent } from './activities/activity-speakers/activity-speakers.component';
import { ActivitySpeakerFormComponent } from './activities/activity-speaker-form/activity-speaker-form.component';
import { SessionShowComponent } from "./sessions/session-show/session-show.component";
import { SessionFormComponent } from "./sessions/session-form/session-form.component";
import { OrganizerFormComponent } from './events/organizer-form/organizer-form/organizer-form.component';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from "@angular-material-components/datetime-picker";
import { SessionListComponent } from './sessions/session-list/session-list.component';
import { RegistrationListComponent } from './registrations/registration-list/registration-list.component';
import { AttendanceListComponent } from './attendances/attendance-list/attendance-list.component';
import { SessionRegistrationFormComponent } from './sessions/session-registration-form/session-registration-form.component';


@NgModule({
  declarations: [
    EventsComponent,
    EventListComponent,
    EventShowComponent,
    EventFormComponent,
    SubeventShowComponent,
    SubeventsFormComponent,
    ActivityShowComponent,
    ActivityFormComponent,
    ActivityListComponent,
    ActivitySpeakersComponent,
    ActivitySpeakerFormComponent,
    SessionShowComponent,
    SessionFormComponent,
    OrganizerFormComponent,
    OrganizerSubeventFormComponent,
    SessionListComponent,
    RegistrationListComponent,
    AttendanceListComponent,
    SessionRegistrationFormComponent,
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    CoreModule,
    SharedModule,
    AngularEditorModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}
  ]
})
export class EventsModule { }
