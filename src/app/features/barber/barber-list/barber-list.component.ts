import { BarberService } from './../../../core/services/barber.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToastrService } from '../../../core/services/toastr.service';
import { Router } from '@angular/router';
import { pageConfig } from '../../../core/constants/page-config.constants';
import { operationMessages } from '../../../core/constants/operation-messages.constants';
import { BarberDTO } from '../../../shared/models/barber.dto';
import { getPagePrimeng } from '../../../shared/utils/page-primeng.utils';
import { TooltipModule } from 'primeng/tooltip';
import { SpecialtyDTO } from '../../../shared/models/specialty.dto';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { BarberFilterComponent } from '../barber-filter/barber-filter.component';
import { BarberFilterDTO } from '../../../shared/models/barber-filter.dto';

@Component({
  selector: 'app-barber-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    ToastModule,
    ConfirmDialog,
    CardModule,
    TooltipModule,
    ButtonGroupModule,
    BarberFilterComponent,
  ],
  templateUrl: './barber-list.component.html',
  styleUrl: './barber-list.component.scss',
})
export class BarberListComponent {
  private readonly confirmationService: ConfirmationService =
    inject(ConfirmationService);
  private readonly toastrService = inject(ToastrService);
  private readonly barberService = inject(BarberService);
  private readonly router = inject(Router);
  pageConfig = pageConfig;
  operationMessages = operationMessages;
  barbers: BarberDTO[] = [];
  totalRecords = 0;
  showTable: boolean = false;

  loadData(event: TableLazyLoadEvent) {
    this.pageConfig = getPagePrimeng(event, this.pageConfig.filters);
    this.barberService.findAll(this.pageConfig).subscribe({
      next: (resp) => {
        this.barbers = resp.content;
        this.totalRecords = resp.totalElements;
      },
      error: (err: Error) => {
        this.toastrService.showErro(
          operationMessages.ERRO,
          'Falha ao buscar dados.'
        );
      },
    });
  }

  private remove(id: string) {
    this.barberService.remove(id).subscribe({
      next: () => {
        this.toastrService.showSucess(
          this.operationMessages.SUCCESS,
          'Barbeiro excluido.'
        );
        this.loadData({ first: 0, rows: this.pageConfig.size });
      },
    });
  }

  search(dto: BarberFilterDTO) {
    this.pageConfig.filters = dto;
    const page = Math.floor(this.pageConfig.page / this.pageConfig.size);
    this.loadData({ first: page, rows: pageConfig.size });
    this.showTable = true;
  }

  clear() {
    this.showTable = false;
    this.barbers = [];
  }

  confirm(id: string, name: string) {
    const nameBold = `<strong>${name}</strong>`;
    this.confirmationService.confirm({
      message: `A exclusão do ${nameBold} não poderá ser desfeita.`,
      header: 'Tem certeza que deseja excluir esse barbeiro?',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancelar',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Excluir',
        severity: 'danger',
      },
      accept: () => {
        this.remove(id);
      },
    });
  }

  getSpecialties(specialties: SpecialtyDTO[]) {
    return specialties.map((s) => s.name).join(', ');
  }

  navigationToEdit(id: string) {
    this.router.navigate(['barber', 'form', id]);
  }
}
