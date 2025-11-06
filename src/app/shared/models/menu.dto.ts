export interface MenuDTO {
  label: string;
  routerLink?: string | null;
  icon?: string;
  roles?: string[];
  expanded?: boolean;
  items: MenuDTO[]; // agora não é opcional
}
