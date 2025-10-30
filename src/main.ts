import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { KeycloakService } from './app/core/services/keycloak.service';
import { importProvidersFrom } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

registerLocaleData(localePt);

const keycloakService = new KeycloakService();

keycloakService.init().then(() => {
  bootstrapApplication(AppComponent, {
    ...appConfig,
    providers: [
      importProvidersFrom(ToastModule),
      ConfirmationService,
      MessageService,
      { provide: KeycloakService, useValue: keycloakService },
      ...appConfig.providers,
    ],
  }).catch((err) => console.error(err));
});
