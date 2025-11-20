import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

export type RegisterDto = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accept?: boolean; // optionnel, accepté par le service
};

export type LoginDto = {
  email: string;
  password: string;
};

type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string; // (demo)
};

const LS_USERS = 'demo_users';
const LS_TOKEN = 'demo_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readUsers(): User[] {
    try { return JSON.parse(localStorage.getItem(LS_USERS) || '[]'); }
    catch { return []; }
  }
  private writeUsers(users: User[]) {
    localStorage.setItem(LS_USERS, JSON.stringify(users));
  }

  isLoggedIn(): boolean { return !!localStorage.getItem(LS_TOKEN); }
  logout(): void { localStorage.removeItem(LS_TOKEN); }

  register(dto: RegisterDto): Observable<void> {
    const users = this.readUsers();
    const email = dto.email.trim().toLowerCase();

    if (users.some(u => u.email.toLowerCase() === email)) {
      return throwError(() => ({ friendly: 'Cet email est déjà utilisé.' }));
    }

    const id = (globalThis as any).crypto?.randomUUID?.() || String(Date.now());
    const user: User = {
      id,
      firstName: dto.firstName.trim(),
      lastName: dto.lastName.trim(),
      email,
      password: dto.password
    };

    users.push(user);
    this.writeUsers(users);
    return of(void 0).pipe(delay(300));
  }

  login(dto: LoginDto): Observable<void> {
    const users = this.readUsers();
    const email = dto.email.trim().toLowerCase();
    const user = users.find(u => u.email.toLowerCase() === email);

    if (!user || user.password !== dto.password) {
      return throwError(() => ({ friendly: 'Email ou mot de passe invalide.' }));
    }

    localStorage.setItem(LS_TOKEN, 'mock-' + user.id);
    return of(void 0).pipe(delay(250));
  }
}
