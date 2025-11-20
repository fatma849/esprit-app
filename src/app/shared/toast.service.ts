import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private snack: MatSnackBar) {}
  success(m: string) { this.snack.open(m, 'OK', { duration: 2500, panelClass: 'toast-success' }); }
  error(m: string)   { this.snack.open(m, 'Fermer', { duration: 3000, panelClass: 'toast-error' }); }
}
