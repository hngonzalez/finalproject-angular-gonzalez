import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './core/auth/auth.component';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { DashboardComponent } from './features/pages/dashboard/dashboard.component';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';

const routes: Routes = [
  { 
    path: '', 
    loadChildren: () => 
      import('./features/features.module').then(m => m.FeaturesModule),
    canActivate: [AuthGuard]
  },
  { 
    path: 'login', 
    component: AuthComponent 
  },
  { 
    path: 'not-found', 
    component: NotFoundComponent 
  },
  { 
    path: '**', 
    redirectTo: 'not-found' 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
