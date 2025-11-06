import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from '../../../environments/environment';
import { map, Observable, shareReplay } from 'rxjs';
import { MenuDTO } from '../../shared/models/menu.dto';

@Injectable({
  providedIn: 'root',
})
export class MenuService extends HttpService {
  url = environment.apiUrl.concat('/menu');

  findAll(): Observable<MenuDTO[]> {
    return this.http
      .get<MenuDTO[]>(`${this.url}`)
      .pipe(
        map((menus) =>
          [...menus].sort((a, b) => a.label.localeCompare(b.label))
        )
      )
      .pipe(shareReplay(1));
  }
}
