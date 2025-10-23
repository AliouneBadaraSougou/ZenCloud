// src/app/intercepteurs/auth.intercepteur.ts
// ========================
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';

export const AuthIntercepteur: HttpInterceptorFn = (req, next) => {
  const serviceAuth = inject(AuthentificationService);
  const token = serviceAuth.obtenirToken();
  
  if (token) {
    const reqAuth = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(reqAuth);
  }
  return next(req);
};