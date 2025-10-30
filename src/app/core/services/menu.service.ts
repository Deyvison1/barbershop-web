import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class MenuService extends HttpService {
  url = environment.apiUrl.concat('/menu');

  findAll(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.url}`);
  }
}
