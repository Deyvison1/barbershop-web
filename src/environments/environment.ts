export const environment = {
  production: true,
  apiUrl: 'http://localhost:8081/api',
  keycloakConfig: {
    url: 'https://keycloak.barbershop-app.shop:8443',
    realm: 'REALM_SPRING_API',
    clientId: 'CLIENT_SPRING',
    urlAccount: 'https://keycloak.barbershop-app.shop:8443/realms/BARBERSHOP/account/'
  },
};
