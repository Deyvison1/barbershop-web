import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  private readonly messageService: MessageService = inject(MessageService);

  showSucess(detail?: string, summary?: string) {
    this.messageService.add({
      severity: 'success',
      summary: summary ?? 'Sucesso',
      detail: detail ?? 'Sucesso.',
    });
  }

  showWarn(detail?: string, summary?: string) {
    this.messageService.add({
      severity: 'warn',
      summary: summary ?? 'Aviso',
      detail: detail ?? 'Aviso.',
    });
  }

  showErro(detail?: string, summary?: string) {
    this.messageService.add({
      severity: 'error',
      summary: summary ?? 'Error',
      detail: detail ?? 'Error.',
    });
  }

  showInfo(detail?: string, summary?: string) {
    this.messageService.add({
      severity: 'info',
      summary: summary ?? 'Informação.',
      detail: detail ?? 'Informação.',
    });
  }

  showContrast(detail?: string, summary?: string) {
    this.messageService.add({
      severity: 'contrast',
      summary: summary ?? 'Error',
      detail: detail ?? 'Message Content',
    });
  }

  showSecondary(detail?: string, summary?: string) {
    this.messageService.add({
      severity: 'secondary',
      summary: summary ?? 'Secondary',
      detail: detail ?? 'Message Content',
    });
  }
}
