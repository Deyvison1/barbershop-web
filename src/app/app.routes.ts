import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'haircut',
    loadComponent: () =>
      import('./features/haircut/haircut.component').then(
        (r) => r.HaircutComponent
      ),
    canActivate: [AuthGuard],
    children: [
      {
        path: 'form',
        loadComponent: () =>
          import('./features/haircut/haircut-form/haircut-form.component').then(
            (r) => r.HaircutFormComponent
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'form/:id',
        loadComponent: () =>
          import('./features/haircut/haircut-form/haircut-form.component').then(
            (r) => r.HaircutFormComponent
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'list',
        loadComponent: () =>
          import('./features/haircut/haircut-list/haircut-list.component').then(
            (r) => r.HaircutListComponent
          ),
        canActivate: [AuthGuard],
      },
    ],
  },
];
