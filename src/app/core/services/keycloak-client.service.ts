import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { KeycloakUserDTO } from '../../shared/models/keycloak-user.dto';

@Injectable({
  providedIn: 'root',
})
export class KeycloakClientService extends HttpService {
  private readonly url: string = environment.apiUrl.concat('/keycloak');

  getUsersByGroup(name: string): Observable<KeycloakUserDTO[]> {
    return this.http.get<KeycloakUserDTO[]>(`${this.url}/${name}`);
  }
}
