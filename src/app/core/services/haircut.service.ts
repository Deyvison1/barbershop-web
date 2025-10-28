import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from '../../../environments/environment';
import { Observable, shareReplay } from 'rxjs';
import { HaircutDTO } from '../../shared/models/haircut.dto';
import { PageDTO } from '../../shared/models/page.dto';
import { PageConfigDTO } from '../../shared/models/page-config.dto';
import { HaircutFilterDTO } from '../../shared/models/haircut-filter.dto';
import { buildPaginationParams } from '../../shared/utils/http-utils';

@Injectable({
  providedIn: 'root',
})
export class HaircutService extends HttpService {
  url: string = environment.apiUrl;

  findAll(
    pageConfig: PageConfigDTO<HaircutFilterDTO>
  ): Observable<PageDTO<HaircutDTO[]>> {
    const params = buildPaginationParams(pageConfig, pageConfig.filters);
    return this.http
      .get<PageDTO<HaircutDTO[]>>(`${this.url}`, { params })
      .pipe(shareReplay(1));
  }

  add(dto: HaircutDTO): Observable<HaircutDTO> {
    return this.http.post<HaircutDTO>(`${this.url}`, dto);
  }

  findById(id: string): Observable<HaircutDTO> {
    return this.http.get<HaircutDTO>(`${this.url}/${id}`);
  }

  update(id: string, dto: HaircutDTO): Observable<HaircutDTO> {
    return this.http.put<HaircutDTO>(`${this.url}/${id}`, dto);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
