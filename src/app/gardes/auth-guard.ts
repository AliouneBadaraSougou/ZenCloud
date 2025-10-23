// ========================
// src/app/gardes/auth.guard.ts
// ========================
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthentificationService } from '../services/authentification.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const serviceAuth = inject(AuthentificationService);
  const router = inject(Router);
  
  if (serviceAuth.estConnecte()) {
    return true;
  } else {
    router.navigate(['/connexion']);
    return false;
  }
};
