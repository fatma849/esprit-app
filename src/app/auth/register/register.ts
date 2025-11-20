import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs/operators';


import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

import { AuthService } from '../../core/auth/auth.service';

// ================== TYPES (doivent être EN DEHORS du @Component) ==================
type UserRole = 'DG' | 'ACADEMIQUE' | 'ADMIN' | 'FINANCE';

interface RegisterDto {
  email: string;
  password: string;
  accept: boolean;
  role: UserRole;
}
// ================================================================================

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterLink,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatCheckboxModule, MatIconModule,
    MatSelectModule, MatOptionModule
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  hide = true;
  loading = false;
  message = '';
  error = '';

  // Liste fermée des rôles — DG pré-sélectionné
  roles = [
    { value: 'DG' as UserRole,         label: 'Directeur général' },
    { value: 'ACADEMIQUE' as UserRole, label: 'Responsable académique' },
    { value: 'ADMIN' as UserRole,      label: 'Responsable administratif' },
    { value: 'FINANCE' as UserRole,    label: 'Responsable financier' }
  ];

  form = this.fb.group({
    role:     ['DG' as UserRole, Validators.required],   // défaut = DG
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    accept:   [false, Validators.requiredTrue]
  });

 submit() {
  if (this.loading) return;

  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  this.loading = true;
  this.error = '';
  this.message = '';

  const { role, email, password, accept } = this.form.getRawValue();

  // ⚠️ si ton service attend encore firstName/lastName:
  const payload = {
    firstName: '-',                // valeurs factices si requis par le DTO
    lastName:  '-',
    role: role as UserRole,
    email: email!,
    password: password!,
    accept: !!accept
  } as any;

  this.auth.register(payload).pipe(
    finalize(() => (this.loading = false))
  ).subscribe({
    next: () => {
      // 1) afficher le succès sur la page d’inscription
      this.message = 'Compte créé avec succès !';

      // 2) rediriger après un court délai (le temps de voir le bandeau)
      setTimeout(() => {
        this.router.navigate(['/auth/login'], {
          queryParams: { registered: 1 }  // pour afficher un message sur le login
          , replaceUrl: true
        });
      }, 600);
    },
    error: (err: any) => {
      this.error =
        err?.friendly || err?.error?.message || err?.message ||
        'Inscription impossible pour le moment.';
    }
  });
}

}
