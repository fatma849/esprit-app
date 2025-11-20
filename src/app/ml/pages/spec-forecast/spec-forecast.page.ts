import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule }      from '@angular/material/input';
import { MatButtonModule }     from '@angular/material/button';
import { MatIconModule }       from '@angular/material/icon';
import { SpecForecastApi, SpecMeta, SpecForecastResponse, SpecForecastYear } from '../../api/spec-forecast.api';

@Component({
  standalone: true,
  selector: 'app-spec-forecast',
  templateUrl: './spec-forecast.page.html',
  styleUrls: ['./spec-forecast.page.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class SpecForecastPage implements OnInit {

  form!: FormGroup;
  meta?: SpecMeta;
  result?: SpecForecastResponse;
  loading = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private api: SpecForecastApi) {
    // 👉 ajout de nmb
    this.form = this.fb.group({
      year:    [null as number | null, [Validators.required]],
      horizon: [3, [Validators.required, Validators.min(1), Validators.max(10)]],
      nmb:     [null], // <- multiplicateur (facultatif)
    });
  }

  ngOnInit(): void {
    this.api.metadata().subscribe({
      next: (m) => {
        this.meta = m;
        if (m?.lastYear) this.form.patchValue({ year: m.lastYear + 1 });
      }
    });
  }

  submit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = null;
    this.result = undefined;

    const year    = Number(this.form.value.year);
    const horizon = Number(this.form.value.horizon);
    const nmb     = this.form.value.nmb;

    // 👉 construire le body avec scenario si nmb est fourni
    const body: any = { year, horizon };
    if (nmb !== null && nmb !== '' && !isNaN(Number(nmb))) {
      body.scenario = { nmb: Number(nmb) }; // sera appliqué côté API
    }

    this.api.predict(body).subscribe({
      next: (r) => { this.result = r; this.loading = false; },
      error: (e) => { this.error = e?.error?.error ?? 'Erreur API'; this.loading = false; }
    });
  }

  trackYear(_i: number, y: SpecForecastYear) {
    return y?.year;
  }
}
