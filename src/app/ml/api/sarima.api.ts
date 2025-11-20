import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE = 'http://127.0.0.1:8001'; // Flask

export interface SarimaResp {
  specialite: string;
  steps: number;
  predictions: { year: number; forecast: number }[];
}

@Injectable({ providedIn: 'root' })
export class SarimaApi {
  constructor(private http: HttpClient) {}

  specialites(): Observable<string[]> {
    return this.http.get<string[]>(`${BASE}/sarima/specialites`);
  }

  predict(specialite: string, steps = 4): Observable<SarimaResp> {
    const params = new HttpParams().set('specialite', specialite).set('steps', steps);
    return this.http.get<SarimaResp>(`${BASE}/sarima/predict`, { params });
  }
}
