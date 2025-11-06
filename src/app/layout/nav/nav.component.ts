import { Menu } from 'primeng/menu';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';

import { MenuItem } from 'primeng/api';
import { MenuService } from '../../core/services/menu.service';
import { HeaderComponent } from '../header/header.component';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { KeycloakService } from '../../core/services/keycloak.service';
import { environment } from '../../../environments/environment';
import { MenuDTO } from '../../shared/models/menu.dto';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    CommonModule,
    PanelMenuModule,
    HeaderComponent,
    RouterOutlet,
    DrawerModule,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
  private readonly menuService: MenuService = inject(MenuService);
  private readonly keycloakService: KeycloakService = inject(KeycloakService);
  private readonly router: Router = inject(Router);
  private readonly clientId: string = environment.keycloakConfig.clientId;
  @ViewChild('profileMenu') profileMenu: Menu;
  sidebarVisible: boolean = false;
  logoPath = 'assets/logo.png';
  menuItems: MenuDTO[] = [];
  private readonly roles: string[] = ['ADMIN'];

  ngOnInit(): void {
    this.initMenu();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.expandActiveRoute();
      });
  }

  private initMenu() {
    this.menuService.findAll().subscribe({
      next: (resp: MenuDTO[]) => {
        this.menuItems = this.filterMenuByRoles(resp);
      },
    });
  }
  private filterMenuByRoles(menu: MenuDTO[]): MenuDTO[] {
    return menu
      .map((item) => {
        const filteredItems = item.items
          ? this.filterMenuByRoles(item.items)
          : [];

        const hasRole =
          !item.roles || item.roles.length === 0
            ? true
            : this.keycloakService.hasAnyRole(item.roles);

        if (hasRole || filteredItems.length > 0) {
          return {
            ...item,
            items: filteredItems,
          };
        }
        return null;
      })
      .filter((x): x is MenuDTO => x !== null);
  }

  private expandActiveRoute() {
    const currentUrl = this.router.url;

    this.menuItems.forEach((parent) => {
      if (parent.items) {
        parent.expanded = parent.items.some(
          (item) => item.routerLink && currentUrl.startsWith(item.routerLink)
        );
      }
    });
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
