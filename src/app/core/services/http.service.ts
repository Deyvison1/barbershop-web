import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export abstract class HttpService {
  protected http: HttpClient = inject(HttpClient);
}
