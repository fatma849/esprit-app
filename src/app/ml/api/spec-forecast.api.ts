import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// backend
const API_BASE = 'http://localhost:8000';

export type SpecMeta = {
  lastYear: number;
  specialites: string[];
  kinds?: Record<string, 'ml' | 'ets' | 'baseline'>;
};

export type SpecForecastItem = {
  specialite: string;
  year: number;
  forecast: number;   // valeur à afficher
  ciLow: number;
  ciHigh: number;
  raw?: number;       // (debug) brute du modèle
};

export type SpecForecastYear = {
  year: number;
  predictions: SpecForecastItem[];
  top: string | null;
};

export type SpecForecastResponse = {
  baseYear: number;
  years: SpecForecastYear[];
};

// 👇 NEW: scénario optionnel envoyé au backend
export type SpecScenario = {
  nmb?: number;     // le backend applique forecast = raw * (nmb * 10000)
  uplift?: number;
  add?: number;
  floor?: number;
  ceil?: number;
};

@Injectable({ providedIn: 'root' })
export class SpecForecastApi {
  constructor(private http: HttpClient) {}

  metadata(): Observable<SpecMeta> {
    return this.http.get<SpecMeta>(`${API_BASE}/api/spec-forecast/metadata`);
  }

  // 👇 NEW: accepte scenario en option
  predict(body: { year: number; horizon: number; scenario?: SpecScenario }): Observable<SpecForecastResponse> {
    return this.http.post<SpecForecastResponse>(`${API_BASE}/api/spec-forecast/predict`, body);
  }
}
