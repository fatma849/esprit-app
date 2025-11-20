import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from './storage.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(StorageService);
  const token = store.get<string>('token');
  const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;
  return next(authReq);
};
