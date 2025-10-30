import { TableLazyLoadEvent } from 'primeng/table';
import { PageConfigDTO } from '../models/page-config.dto';

export const getPagePrimeng = <T>(
  event: TableLazyLoadEvent,
  filters?: T
): PageConfigDTO<T> => {
  const first = event.first ?? 0;
  const size = event.rows ?? 10;
  const page = Math.floor(first / size);

  return {
    page,
    size,
    filters: filters,
  };
};
