// app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./payments/payment-list/payment-list')
        .then(m => m.PaymentListComponent)
  },
  {
    path: 'add',
    loadComponent: () =>
      import('./payments/payment-form/payment-form')
        .then(m => m.PaymentForm)
  },
  {
    path: 'edit/:id',
    loadComponent: () =>
      import('./payments/payment-form/payment-form')
        .then(m => m.PaymentForm)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
