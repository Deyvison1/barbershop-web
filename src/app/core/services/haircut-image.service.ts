import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from '../../../environments/environment';
import { HaircutImageDTO } from '../../shared/models/haircut-image.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HaircutImageService extends HttpService {
  private readonly url = environment.apiUrl.concat('/haircut-image');

  uploadImage(haircutId: string, file: File, active: boolean = false) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('active', String(active));

    return this.http.post<HaircutImageDTO>(
      `${this.url}/${haircutId}/upload`,
      formData
    );
  }

  activateImage(id: string): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}/activate`, {});
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
