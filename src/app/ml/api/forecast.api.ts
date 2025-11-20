import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type ForecastPayload = {
  year: number;
  nb_mobilites: number;
  nb_partenaires: number;
  nb_pays: number;
  funding_sum: number;
  nb_inscrits_lag1: number;
};

// ⚠️ Choisis **une** des 2 formes selon CE QUE TON FLASK RENVOIE

// --- CAS A: Flask renvoie { year, value } --------------------
export type PredictRes = {
  model: string;
  year: number;
  value: number;
  features_used: string[];
};

// // --- CAS B: Flask renvoie { target_year, prediction } ------
// export type PredictRes = {
//   model: string;
//   target_year: number;
//   prediction: number;
//   features_used: string[];
// };

@Injectable({ providedIn: 'root' })
export class ForecastApi {
  // ✅ L’URL de base doit être celle du serveur Flask (pas /metadata)
  private base = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  predict(body: ForecastPayload): Observable<PredictRes> {
    // ✅ endpoint de prédiction
    return this.http.post<PredictRes>(`${this.base}/forecast/predict`, body);
  }

  metadata() {
    return this.http.get(`${this.base}/forecast/metadata`);
  }
}
