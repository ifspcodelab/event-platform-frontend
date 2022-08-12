import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'locations',
        loadChildren: () => import('./locations/locations.module').then(m => m.LocationsModule),
        title: 'Locais - Área Administrativa'
      },
      {
        path: 'events',
        loadChildren: () => import('./events/events.module').then(m => m.EventsModule),
        title: 'Eventos - Área Administrativa'
      },
      {
        path: 'speakers',
        loadChildren: () => import('./speakers/speakers.module').then(m => m.SpeakersModule),
        title: 'Ministrantes - Área Administrativa'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
