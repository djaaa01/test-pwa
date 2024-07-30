import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CapacitorComponent } from './capacitor/capacitor.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'capacitor', component: CapacitorComponent },
  { path: '**', component: HomeComponent },
];
