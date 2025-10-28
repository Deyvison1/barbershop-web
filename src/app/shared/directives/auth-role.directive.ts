import { Directive, ElementRef, inject, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appAuthRole]',
})
export class AuthRoleDirective implements OnInit {
  private readonly el = inject(ElementRef);
  @Input({ required: true }) appAuthRole!: string[];

  ngOnInit(): void {
    this.hideElement();
  }

  hideElement() {
    if (!this.hasAnyRealmRole()) {
      this.el.nativeElement.style.display = 'none';
      this.el.nativeElement.remove();
    }
  }

  hasAnyRealmRole(): boolean {
    const realmRoles = [''];

    return this.appAuthRole.some((role) => realmRoles.includes(role));
  }
}
