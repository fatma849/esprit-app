import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { StorageService } from './storage.service';

export const mockAuthInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith('/api/')) return next(req);

  const store = inject(StorageService);
  const users = store.get<any[]>('users') ?? [];
  const body = (req.body ?? {}) as any;

  // REGISTER
  if (req.url.endsWith('/auth/register') && req.method === 'POST') {
    if (!body.email || !body.password || !body.firstName || !body.lastName || !body.accept) {
      return of(new HttpResponse({ status: 400, body: { message: 'MISSING_FIELDS' } })).pipe(delay(300));
    }
    if (users.some(u => u.email.toLowerCase() === body.email.toLowerCase())) {
      return of(new HttpResponse({ status: 409, body: { message: 'EMAIL_EXISTS' } })).pipe(delay(300));
    }
    const newUser = {
      id: crypto.randomUUID?.() ?? Math.random().toString(36).slice(2),
      email: body.email, password: body.password,
      firstName: body.firstName, lastName: body.lastName,
      role: body.role ?? 'user'
    };
    users.push(newUser);
    store.set('users', users);
    return of(new HttpResponse({ status: 201, body: { ok: true } })).pipe(delay(400));
  }

  // LOGIN
  if (req.url.endsWith('/auth/login') && req.method === 'POST') {
    const found = users.find(u => u.email === body.email && u.password === body.password);
    if (!found) {
      return of(new HttpResponse({ status: 401, body: { message: 'INVALID_CREDENTIALS' } })).pipe(delay(300));
    }
    const token = btoa(`${found.id}:${found.email}`);
    return of(new HttpResponse({
      status: 200,
      body: { token, user: { id: found.id, email: found.email, firstName: found.firstName, role: found.role } }
    })).pipe(delay(300));
  }

  return next(req);
};
