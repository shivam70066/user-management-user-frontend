import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', title: "Login", component: LoginComponent },
  { path: 'signup', title: "Sign Up", component: SignupComponent },
  { path: 'home', title: "Home", component: HomeComponent },


];
