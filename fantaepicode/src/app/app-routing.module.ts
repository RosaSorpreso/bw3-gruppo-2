import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestGuard } from './auth/guest.guard';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { AdminGuard } from './auth/admin.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    title: 'Epicode Snap'
  },
  {
    path: 'homepage',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    title: 'Epicode Snap | Homepage',
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule),
    title: 'Epicode Snap | Il Tuo Profilo',
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule),
    title: 'Epicode Snap | Utenti',
    canActivate: [AuthGuard]
  },
  {
    path: 'players',
    loadChildren: () => import('./pages/players/players.module').then(m => m.PlayersModule),
    title: 'Epicode Snap | Developers',
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    loadChildren: () => import('./backoffice/create/create.module').then(m => m.CreateModule),
    title: 'Epicode Snap',
    canActivate: [AdminGuard]
  },
  {
    path: 'edit/:id',
    loadChildren: () => import('./backoffice/edit/edit.module').then(m => m.EditModule),
    title: 'Epicode Snap',
    canActivate: [AdminGuard]
  },
  { path: 'game',
    loadChildren: () => import('./pages/game/game.module').then(m => m.GameModule),
    title: 'Epicode Snap | Game',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
