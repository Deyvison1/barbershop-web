import { getPagePrimeng } from './../../../shared/utils/page-primeng.utils';
import { Component, inject, OnInit } from '@angular/core';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HaircutService } from '../../../core/services/haircut.service';
import { HaircutDTO } from '../../../shared/models/haircut.dto';
import { Router } from '@angular/router';
import { pageConfig } from '../../../core/constants/page-config.constants';
import { ToastrService } from '../../../core/services/toastr.service';
import { operationMessages } from '../../../core/constants/operation-messages.constants';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { HaircutFilterComponent } from '../haircut-filter/haircut-filter.component';
import { HaircutFilterDTO } from '../../../shared/models/haircut-filter.dto';

@Component({
  selector: 'app-haircut-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    ImageModule,
    ToastModule,
    ConfirmDialog,
    HaircutFilterComponent,
  ],
  templateUrl: './haircut-list.component.html',
  styleUrls: ['./haircut-list.component.scss'],
})
export class HaircutListComponent implements OnInit {
  private readonly haircutService = inject(HaircutService);
  private readonly confirmationService: ConfirmationService =
    inject(ConfirmationService);
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);
  pageConfig = pageConfig;
  operationMessages = operationMessages;
  haircuts: HaircutDTO[] = [];
  totalRecords = 0;
  showTable: boolean = false;

  ngOnInit() {
    this.loadData({ first: 0, rows: 5 });
  }

  confirm(id: string, name: string) {
    const nameBold = `<strong>${name}</strong>`;
    this.confirmationService.confirm({
      message: `A exclusão do ${nameBold} não poderá ser desfeita.`,
      header: 'Tem certeza que deseja excluir esse corte?',
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

  getUriImage(haircut: HaircutDTO) {
    if (haircut.images?.length) {
      return `data:${haircut.images[0].contentType};base64,${haircut.images[0].data}`;
    }
    return '';
  }

  navigationToEdit(dto: HaircutDTO) {
    this.router.navigate(['haircut', 'form', dto.id]);
  }

  loadData(event: TableLazyLoadEvent) {
    this.pageConfig = getPagePrimeng(event, this.pageConfig.filters);
    this.haircutService.findAll(this.pageConfig).subscribe({
      next: (resp) => {
        this.haircuts = resp.content;
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

  clear() {
    this.showTable = false;
  }

  search(dto: HaircutFilterDTO) {
    this.pageConfig.filters = dto;
    const page = Math.floor(this.pageConfig.page / this.pageConfig.size);
    this.loadData({first: page, rows: pageConfig.size});
    this.showTable = true;
  }

  private remove(id: string) {
    this.haircutService.remove(id).subscribe({
      next: () => {
        this.toastrService.showSucess(
          this.operationMessages.SUCCESS,
          'Corte excluido.'
        );
        this.loadData({ first: 0, rows: this.pageConfig.size });
      },
    });
  }
}
