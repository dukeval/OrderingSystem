import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MarketPlaceComponent } from './market-place/market-place.component';
import { LandingComponent } from './Landing/landing.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthguardService } from './authguard.service';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'marketplace',
    component: MarketPlaceComponent,
    canActivate: [AuthguardService]
  },
  { path: 'register', component: RegistrationComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthguardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
