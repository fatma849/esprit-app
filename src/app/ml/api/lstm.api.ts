import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LstmApi {
  private base = 'http://localhost:8001/lstm';
  constructor(private http: HttpClient) {}

  // data = { "2021": 124500, "2022": 125800, ... }
  predict(data: Record<string, number>, n_years: number) {
    return this.http.post<{predictions: Record<string, number>}>(
      `${this.base}/predict`,
      { data, n_years }
    );
  }
}
