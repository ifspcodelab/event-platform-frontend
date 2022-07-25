import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsComponent } from './locations.component';
import { LocationListComponent } from './locations/location-list/location-list.component';
import { LocationShowComponent } from './locations/location-show/location-show.component';
import { AreaShowComponent } from './areas/area-show/area-show.component';
import { LocationFormComponent } from './locations/location-form/location-form.component';

import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    LocationsComponent,
    LocationListComponent,
    LocationShowComponent,
    AreaShowComponent,
    LocationFormComponent
  ],
  imports: [
    CommonModule,
    LocationsRoutingModule,
    MatTableModule,
    MatButtonModule
  ]
})
export class LocationsModule { }
