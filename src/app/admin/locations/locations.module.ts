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


@NgModule({
  declarations: [
    LocationsComponent,
    LocationListComponent,
    LocationShowComponent,
    AreaShowComponent,
    LocationFormComponent,
    SpaceShowComponent
  ],
  imports: [
    CommonModule,
    LocationsRoutingModule,
    MatTableModule
  ]
})
export class LocationsModule { }
