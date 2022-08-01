import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaShowComponent } from './areas/area-show/area-show.component';
import { LocationsComponent } from './locations.component';
import { LocationFormComponent } from './locations/location-form/location-form.component';
import { LocationListComponent } from './locations/location-list/location-list.component';
import { LocationShowComponent } from './locations/location-show/location-show.component';
import { SpaceShowComponent } from "./spaces/space-show/space-show.component";

const routes: Routes = [
  {
    path: '',
    component: LocationsComponent,
    children: [
      { path: '', component: LocationListComponent },
      { path: 'novo', component: LocationFormComponent },
      { path: ':locationId', component: LocationShowComponent },
      { path: ':locationId/editar', component: LocationFormComponent },
      { path: ':locationId/areas/:areaId', component: AreaShowComponent },
      { path: ':locationId/areas/:areaId/spaces/:spaceId', component: SpaceShowComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationsRoutingModule { }
