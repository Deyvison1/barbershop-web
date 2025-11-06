import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeycloakService } from '../../../core/services/keycloak.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-forbidden',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './forbidden.component.html',
  styleUrl: './forbidden.component.scss',
})
export class ForbiddenComponent {
  private readonly authService = inject(KeycloakService);

  logout() {
    this.authService.logout();
  }
}
