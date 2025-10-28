import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { KeycloakDecodedToken } from '../../shared/models/keycloak-decoded-token.dto';

@Injectable({ providedIn: 'root' })
export class KeycloakService {
  private keycloak?: Keycloak;

  /** Inicializa o Keycloak e força login via redirect */
  init(): Promise<void> {
    this.keycloak = new Keycloak({
      url: 'http://keycloak.local:8080', // Keycloak local HTTP
      realm: 'REALM_SPRING_API',
      clientId: 'CLIENT_SPRING',
    });

    return this.keycloak
      .init({
        onLoad: 'login-required',
        checkLoginIframe: false, // evita iframe que causa erro de cookie em HTTP
      })
      .then((authenticated) => {
        if (!authenticated) {
          this.keycloak?.login();
        }
      });
  }

  /** Retorna a instância do Keycloak */
  getKeycloakInstance(): Keycloak {
    if (!this.keycloak) throw new Error('Keycloak não inicializado');
    return this.keycloak;
  }

  /** Retorna o token decodificado */
  getDecodedToken(): KeycloakDecodedToken | undefined {
    return this.keycloak?.tokenParsed as KeycloakDecodedToken;
  }

  /** Roles do client */
  getClientRoles(clientId: string): string[] {
    return this.getDecodedToken()?.resource_access?.[clientId]?.roles || [];
  }

  /** Roles do realm */
  getRealmRoles(): string[] {
    return this.getDecodedToken()?.realm_access?.roles || [];
  }

  /** Verifica se o usuário tem algum role */
  hasAnyRole(roles: string[], clientId?: string): boolean {
    const userRoles = clientId
      ? this.getClientRoles(clientId)
      : this.getRealmRoles();
    return roles.some((role) => userRoles.includes(role));
  }

  /** Logout */
  logout(): void {
    this.keycloak?.logout({ redirectUri: window.location.origin });
  }

  /** Verifica se está logado */
  isLoggedIn(): boolean {
    return !!this.keycloak?.token;
  }
}
