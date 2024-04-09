import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestGuard } from './auth/guest.guard';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),

  },
  {
    path: 'homepage',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),


  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule),

  },
  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule),

  },
  {
    path: 'players',
    loadChildren: () => import('./pages/players/players.module').then(m => m.PlayersModule),

  },
  {
    path: 'create',
    loadChildren: () => import('./backoffice/create/create.module').then(m => m.CreateModule),

  },
  {
    path: 'edit',
    loadChildren: () => import('./backoffice/edit/edit.module').then(m => m.EditModule),

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
