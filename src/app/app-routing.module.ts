import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { LoginComponent } from './auth/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { ProjecstComponent } from './pages/projecst/projecst.component';
import { DetailsComponent } from './pages/details/details.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  { path: 'login',    component: LoginComponent     },
  { path: 'register', component: RegisterComponent  },
  {
    path: 'spaces',
    component: MainComponent,
    children: [
      { path: 'list', component: ProjecstComponent },
      { path: 'details', component: DetailsComponent },
      { path: '**', redirectTo: 'list' }
    ],
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
