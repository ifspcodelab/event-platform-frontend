import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from './../../core/core.module';

import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsComponent } from './locations.component';
import { LocationListComponent } from './locations/location-list/location-list.component';
import { LocationShowComponent } from './locations/location-show/location-show.component';
import { AreaShowComponent } from './areas/area-show/area-show.component';
import { LocationFormComponent } from './locations/location-form/location-form.component';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';


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
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    CoreModule,
    MatDialogModule,
    MatInputModule
  ]
})
export class LocationsModule { }
