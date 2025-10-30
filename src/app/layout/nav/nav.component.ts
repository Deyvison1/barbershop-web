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
  private readonly router: Router = inject(Router);
  @ViewChild('profileMenu') profileMenu: Menu;
  sidebarVisible: boolean = false;
  logoPath = 'assets/logo.png';
  menuItems: MenuItem[] = [];

  ngOnInit(): void {
    this.initMenu();

    // Detecta mudanças de rota
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.expandActiveRoute();
      });
  }

  private initMenu() {
    this.menuService.findAll().subscribe({
      next: (resp) => {
        this.menuItems = resp;
      },
    });
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
