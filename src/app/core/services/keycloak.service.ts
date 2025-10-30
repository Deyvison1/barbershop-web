import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { KeycloakDecodedToken } from '../../shared/models/keycloak-decoded-token.dto';

@Injectable({ providedIn: 'root' })
export class KeycloakService {
  private keycloak?: Keycloak;

  init(): Promise<void> {
    this.keycloak = new Keycloak({
      url: environment.keycloakConfig.url,
      realm: environment.keycloakConfig.realm,
      clientId: environment.keycloakConfig.clientId,
    });

    return this.keycloak
      .init({
        onLoad: 'login-required',
        checkLoginIframe: false,
      })
      .then((authenticated) => {
        if (!authenticated) {
          this.keycloak?.login();
        }
      });
  }

  getKeycloakInstance(): Keycloak {
    if (!this.keycloak) throw new Error('Keycloak não inicializado');
    return this.keycloak;
  }

  getDecodedToken(): KeycloakDecodedToken | undefined {
    return this.keycloak?.tokenParsed as KeycloakDecodedToken;
  }

  getClientRoles(clientId: string): string[] {
    return this.getDecodedToken()?.resource_access?.[clientId]?.roles || [];
  }

  async getToken(): Promise<string> {
    if (!this.keycloak) {
      throw new Error('Keycloak não inicializado');
    }

    // Atualiza token se faltar menos de 30 segundos
    return new Promise<string>((resolve, reject) => {
      this.keycloak
        .updateToken(30)
        .then((refreshed) => {
          resolve(this.keycloak.token!);
        })
        .catch(() => {
          reject(new Error('Falha ao atualizar token'));
        });
    });
  }

  getRealmRoles(): string[] {
    return this.getDecodedToken()?.realm_access?.roles || [];
  }

  hasAnyRole(roles: string[], clientId?: string): boolean {
    const userRoles = clientId
      ? this.getClientRoles(clientId)
      : this.getRealmRoles();
    return roles.some((role) => userRoles.includes(role));
  }

  logout(): void {
    this.keycloak?.logout({ redirectUri: globalThis.location.origin });
  }

  isLoggedIn(): boolean {
    return !!this.keycloak?.token;
  }
}
