import { PageConfigDTO } from './../../shared/models/page-config.dto';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from '../../../environments/environment';
import { Observable, shareReplay } from 'rxjs';
import { BarberDTO } from '../../shared/models/barber.dto';
import { BarberFilterDTO } from '../../shared/models/barber-filter.dto';
import { PageDTO } from '../../shared/models/page.dto';
import { buildPaginationParams } from '../../shared/utils/http-utils';

@Injectable({
  providedIn: 'root',
})
export class BarberService extends HttpService {
  private readonly url: string = environment.apiUrl.concat('/barber');

  findAll(
    pageConfig: PageConfigDTO<BarberFilterDTO>
  ): Observable<PageDTO<BarberDTO[]>> {
    const params = buildPaginationParams(pageConfig, pageConfig.filters);
    return this.http.get<PageDTO<BarberDTO[]>>(`${this.url}`, { params }).pipe(shareReplay());
  }

  add(dto: BarberDTO): Observable<BarberDTO> {
    return this.http.post<BarberDTO>(`${this.url}`, dto);
  }

  update(id: string, dto: BarberDTO): Observable<BarberDTO> {
    return this.http.put<BarberDTO>(`${this.url}/${id}`, dto);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  findById(id: string): Observable<BarberDTO> {
    return this.http.get<BarberDTO>(`${this.url}/${id}`);
  }
}
