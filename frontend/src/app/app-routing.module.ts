import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './modules/login/login.component';
import { HomeComponent } from './modules/home/home.component';
import { AuthGuard } from './guard/auth.guard';
import { RegisterComponent } from './modules/register/register.component';
import { VehiclesComponent } from './modules/vehicles/vehicles.component';
import { ProfilesComponent } from './modules/profiles/profiles.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'vehiculos', component: VehiclesComponent, canActivate: [AuthGuard] },
  { path: 'usuarios', component: ProfilesComponent, canActivate: [AuthGuard] },
  // Otras rutas protegidas...
  { path: '', redirectTo: '/vehiculos', pathMatch: 'full' },
  { path: '**', redirectTo: '/vehiculos' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
