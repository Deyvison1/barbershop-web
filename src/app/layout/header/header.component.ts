import { Component, inject, input, output, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Menu, MenuModule } from 'primeng/menu';
import { KeycloakService } from '../../core/services/keycloak.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, MenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly keycloakService: KeycloakService = inject(KeycloakService);
  @ViewChild('profileMenu') profileMenu: Menu;
  logoPath = 'assets/logo.png';
  env = environment;

  showSideBar = output<boolean>();
  sidebarVisible = input<boolean>();
  toggleProfileMenu(event: Event) {
    this.profileMenu.toggle(event);
  }

  profileItems: MenuItem[] = [
    { label: 'Minha Conta', icon: 'pi pi-user', command: () => {
      globalThis.location.href = this.env.keycloakConfig.urlAccount;
    } },
    { separator: true },
    {
      label: 'Sair',
      icon: 'pi pi-sign-out',
      command: () => {
        this.keycloakService.logout();
      },
    },
  ];

  toggleSidebar() {
    this.showSideBar.emit(this.sidebarVisible());
  }
}
