import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'trips',
    loadChildren: () => import('./pages/trips/trips.module').then(m => m.TripsPageModule)
  },
  { path: 'trips', loadChildren: './pages/trips/trips.module#TripsPageModule' },
  { path: 'new-trip/:key', loadChildren: './pages/new-trip/new-trip.module#NewTripPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
