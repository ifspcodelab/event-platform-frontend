import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsComponent } from './locations.component';
import { LocationListComponent } from './locations/location-list/location-list.component';
import { LocationShowComponent } from './locations/location-show/location-show.component';
import { AreaShowComponent } from './areas/area-show/area-show.component';
import { LocationFormComponent } from './locations/location-form/location-form.component';

import { MatTableModule } from '@angular/material/table';
import { SpaceShowComponent } from './spaces/space-show/space-show.component';
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from "@angular/material/icon";
import {SpaceTypesPipe} from "../../core/pipes/space-types.pipe";
import { SpacesFormComponent } from './spaces/spaces-form/spaces-form.component';
import {CoreModule} from "../../core/core.module";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    LocationsComponent,
    LocationListComponent,
    LocationShowComponent,
    AreaShowComponent,
    LocationFormComponent,
    SpaceShowComponent,
    SpaceTypesPipe,
    SpacesFormComponent
  ],
  imports: [
    CommonModule,
    LocationsRoutingModule,
    CoreModule,
    SharedModule
  ]
})
export class LocationsModule { }
