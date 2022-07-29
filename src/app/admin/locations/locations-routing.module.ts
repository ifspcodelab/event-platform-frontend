import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaShowComponent } from './areas/area-show/area-show.component';
import { LocationsComponent } from './locations.component';
import { LocationListComponent } from './locations/location-list/location-list.component';
import { LocationShowComponent } from './locations/location-show/location-show.component';

const routes: Routes = [
  {
    path: '',
    component: LocationsComponent,
    children: [
      { path: '', component: LocationListComponent },
      // { path: 'novo', component: LocationFormComponent },
      { path: ':locationId', component: LocationShowComponent },
      // { path: ':locationId/editar', component: LocationFormComponent },
      { path: ':locationId/areas/:areaId', component: AreaShowComponent },
      // { path: ':locationId/areas/:areaId/spaces/:space.id', component: SpaceShowComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationsRoutingModule { }
