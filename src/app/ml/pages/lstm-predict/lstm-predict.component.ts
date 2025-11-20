import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LstmApi } from '../../api/lstm.api';

@Component({
  selector: 'app-ml-lstm',
  standalone: true,
  templateUrl: './lstm-predict.component.html',
  styleUrls: ['./lstm-predict.component.scss'],   // ⬅️ SCSS
  imports: [CommonModule, FormsModule, DecimalPipe]
})
export class LstmPredictComponent {
  pairs = '2021:124500, 2022:125800, 2023:126500, 2024:127000, 2025:128300';
  nYears = 3;
  busy = false;
  error?: string;
  predictions?: Record<string, number>;

  constructor(private api: LstmApi) {}

  private parsePairs(): Record<string, number> {
    const out: Record<string, number> = {};
    for (const p of this.pairs.split(',')) {
      const [y, v] = p.split(':').map(s => s.trim());
      if (y && v && !isNaN(+v)) out[y] = Number(v);
    }
    return out;
  }

  submit() {
    this.error = undefined;
    this.predictions = undefined;
    const data = this.parsePairs();
    this.busy = true;
    this.api.predict(data, this.nYears).subscribe({
      next: r => { this.predictions = r.predictions; this.busy = false; },
      error: e => { this.error = e?.error?.error || 'Erreur serveur'; this.busy = false; }
    });
  }

  trackByKey = (i: number, kv: {key:string; value:number}) => kv.key;
  keys = (o?: Record<string, number>) => o ? Object.keys(o).sort() : [];
}
