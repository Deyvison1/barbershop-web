import { Component, input, output, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Menu, MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, MenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @ViewChild('profileMenu') profileMenu: Menu;
  logoPath = 'assets/logo.png';

  showSideBar = output<boolean>();
  sidebarVisible = input<boolean>();
  toggleProfileMenu(event: Event) {
    this.profileMenu.toggle(event);
  }

  profileItems: MenuItem[] = [
    { label: 'Minha Conta', icon: 'pi pi-user' },
    { separator: true },
    { label: 'Sair', icon: 'pi pi-sign-out' },
  ];

  toggleSidebar() {
    this.showSideBar.emit(this.sidebarVisible());
  }
}
