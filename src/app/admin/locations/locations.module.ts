import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from './../../core/core.module';

import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsComponent } from './locations.component';
import { LocationListComponent } from './locations/location-list/location-list.component';
import { LocationShowComponent } from './locations/location-show/location-show.component';
import { AreaShowComponent } from './areas/area-show/area-show.component';
import { LocationFormComponent } from './locations/location-form/location-form.component';


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
    CoreModule,
    SharedModule
  ]
})
export class LocationsModule { }
