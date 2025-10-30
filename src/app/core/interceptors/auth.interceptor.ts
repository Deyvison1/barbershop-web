import {
  HttpErrorResponse,
  HttpHeaders,
  HttpInterceptorFn,
} from '@angular/common/http';
import { KeycloakService } from '../services/keycloak.service';
import { from, switchMap, tap } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const keycloakService = inject(KeycloakService);

  return from(keycloakService.getToken()).pipe(
    switchMap((token) => {
      let headers = req.headers || new HttpHeaders();
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }

      const cloneReq = req.clone({ headers });

      return next(cloneReq).pipe(
        tap({
          error: (err: HttpErrorResponse) => {
            switch (err.status) {
              case 401:
                keycloakService.logout();
                break;
              case 403:
                router.navigateByUrl('/forbidden');
                break;
            }
          },
        })
      );
    })
  );
};
