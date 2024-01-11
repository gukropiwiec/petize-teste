import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetalhesComponent } from './components/detalhes/detalhes.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: ':id', component: DetalhesComponent }
];
