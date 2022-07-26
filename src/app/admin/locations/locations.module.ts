import { CoreModule } from './../../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsComponent } from './locations.component';
import { LocationListComponent } from './locations/location-list/location-list.component';
import { LocationShowComponent } from './locations/location-show/location-show.component';
import { AreaShowComponent } from './areas/area-show/area-show.component';
import { AreaFormComponent } from './areas/area-form/area-form.component';
import { LocationFormComponent } from './locations/location-form/location-form.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    LocationsComponent,
    LocationListComponent,
    LocationShowComponent,
    AreaShowComponent,
    LocationFormComponent,
    AreaFormComponent
  ],
  imports: [
    CommonModule,
    LocationsRoutingModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    CoreModule
  ]
})
export class LocationsModule { }
