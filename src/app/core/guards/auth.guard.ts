import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { KeycloakService } from '../services/keycloak.service';

export const AuthGuard: CanActivateFn = async (): Promise<boolean> => {
  const auth = inject(KeycloakService);

  const isLogado = auth.isLoggedIn();

  if (!isLogado) {
    auth.logout();
    return false;
  }

  return true;
};
