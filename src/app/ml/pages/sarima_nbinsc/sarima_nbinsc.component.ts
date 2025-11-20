import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SarimaApi } from '../../api/sarima.api';

type Row = { year: number; forecast: number };

@Component({
  selector: 'app-sarima-nbinsc',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sarima_nbinsc.component.html',
  styleUrls: ['./sarima_nbinsc.component.scss']
})
export class SarimaNbinscComponent implements OnInit {
  loading = false;
  error = '';
  specialites: string[] = [];
  rows: Row[] = [];

  // formulaire (init dans ngOnInit pour éviter TS2729)
  form!: FormGroup;

  constructor(private fb: FormBuilder, private api: SarimaApi) {}

  ngOnInit(): void {
    // init form
    this.form = this.fb.group({
      specialite: ['', Validators.required],
      steps: [4, [Validators.required, Validators.min(1), Validators.max(10)]],
    });

    // charger la liste des spécialités
    this.api.specialites().subscribe({
      next: (list) => (this.specialites = list ?? []),
      error: () => (this.error = 'Impossible de charger les spécialités')
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.error = '';
    this.rows = [];
    this.loading = true;

    const { specialite, steps } = this.form.value as { specialite: string; steps: number };

    this.api.predict(specialite, steps).subscribe({
      next: (res) => {
        // ➜ arrondir ici pour afficher des entiers sans séparateurs
        this.rows = (res?.predictions ?? []).map(p => ({
          year: p.year,
          forecast: Math.round(p.forecast)
        }));
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.error || 'Erreur pendant la prédiction.';
        this.loading = false;
      }
    });
  }
}
