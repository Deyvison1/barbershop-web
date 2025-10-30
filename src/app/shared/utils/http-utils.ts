import { HttpParams } from '@angular/common/http';
import { PageConfigDTO } from '../models/page-config.dto';

/**
 * Constrói HttpParams a partir de um PageConfigDTO e filtros opcionais.
 * @param pageConfig Configuração de paginação (page, size, filtros)
 * @param filters Filtros opcionais (qualquer objeto)
 */
export function buildPaginationParams<F>(
  pageConfig: PageConfigDTO<F>,
  filters?: Partial<F>
): HttpParams {
  let params = new HttpParams()
    .set('page', pageConfig.page.toString())
    .set('size', pageConfig.size.toString());
console.log(filters)
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, String(value));
      }
    });
  }

  return params;
}
