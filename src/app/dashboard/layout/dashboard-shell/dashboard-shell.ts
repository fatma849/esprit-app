import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

type Role = 'DG' | 'ACADEMIQUE' | 'ADMIN' | 'FINANCE';

interface User {
  name: string;
  role: Role;
  avatar?: string;
  roleLabel?: string;
}

const ROLE_LABEL: Record<Role, string> = {
  DG: 'Directeur général',
  ACADEMIQUE: 'Responsable académique',
  ADMIN: 'Responsable administratif',
  FINANCE: 'Responsable financier'
} as const;

function toRole(v: string | null): Role {
  return v === 'DG' || v === 'ACADEMIQUE' || v === 'ADMIN' || v === 'FINANCE' ? v : 'DG';
}

@Component({
  selector: 'app-dashboard-shell',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dashboard-shell.html',
  styleUrls: ['./dashboard-shell.scss']
})
export class DashboardShellComponent {
  user: User = {
    name: sessionStorage.getItem('welcomeName') || 'directeur_generale',
    role: toRole(sessionStorage.getItem('role')),
    avatar: sessionStorage.getItem('avatarUrl') || ''
  };

  ngOnInit() {
    const role = this.user.role; // rôle bien typé ici
    this.user = { ...this.user, roleLabel: ROLE_LABEL[role] };
  }

  initials(name: string){
    const n = (name || '').replace(/[_\-]+/g,' ').trim();
    const p = n.split(/\s+/);
    const a = (p[0]?.[0]||'').toUpperCase();
    const b = (p[1]?.[0]||'').toUpperCase();
    return (a+b) || 'DG';
  }
}
