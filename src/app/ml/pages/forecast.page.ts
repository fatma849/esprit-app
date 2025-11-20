import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForecastApi, ForecastPayload, PredictRes } from '../api/forecast.api';

@Component({
  standalone: true,
  selector: 'ml-forecast-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './forecast.page.html',
  styleUrls: ['./forecast.page.css']
})
export class ForecastPage implements OnInit {
  loading = false;
  error?: string;
  result?: PredictRes;
  form!: FormGroup;

  constructor(private fb: FormBuilder, private api: ForecastApi) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      year: [2026, [Validators.required]],
      nb_inscrits_lag1: [0, [Validators.required, Validators.min(0)]],
      nb_mobilites: [0, [Validators.required, Validators.min(0)]],
      nb_partenaires: [0, [Validators.required, Validators.min(0)]],
      nb_pays: [0, [Validators.required, Validators.min(0)]],
      funding_sum: [0, [Validators.required, Validators.min(0)]],
    });
  }

  private toPayload(): ForecastPayload {
    const r = this.form.getRawValue();
    // 🔢 Convertit *toujours* en nombres (sinon on envoie des strings "01", "11"...)
    return {
      year: Number(r.year),
      nb_inscrits_lag1: Number(r.nb_inscrits_lag1),
      nb_mobilites: Number(r.nb_mobilites),
      nb_partenaires: Number(r.nb_partenaires),
      nb_pays: Number(r.nb_pays),
      funding_sum: Number(r.funding_sum),
    };
  }

  submit(): void {
    if (this.form.invalid) return;
    this.loading = true; this.error = undefined; this.result = undefined;

    const payload = this.toPayload();
    this.api.predict(payload).subscribe({
      next: (res) => {
        console.log('API predict ->', res); // 👀 tu verras les *vraies* clés ici
        this.result = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('API error', err);
        this.error = err?.error?.error || 'Erreur API';
        this.loading = false;
      }
    });
  }
}
