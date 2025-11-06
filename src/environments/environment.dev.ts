export const environment = {
  production: false,
  apiUrl: 'http://localhost:8081/api',
  keycloakConfig: {
    url: 'https://keycloak.barbershop-app.shop:8443',
    realm: 'BARBERSHOP',
    clientId: 'BARBERSHOP_CLIENT',
    urlAccount:
      'https://keycloak.barbershop-app.shop:8443/realms/BARBERSHOP/account/',
  },
};
