// ========================
// src/app/services/authentification.service.ts
// ========================
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Utilisateur, DemandeConnexion, DemandeInscription, ReponseAuth } from '../modeles/utilisateur.model';
import { environment } from '../config/environment.config';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private urlApi = environment.apiUrl;
  private utilisateurActuelSubject = new BehaviorSubject<Utilisateur | null>(null);
  public utilisateurActuel$ = this.utilisateurActuelSubject.asObservable();

  // Données mock pour le développement
  private utilisateurMock: Utilisateur = {
    id: '1',
    nomUtilisateur: 'Admin Développement',
    email: 'admin@example.com',
    espaceUtilise: 52428800, // 50 MB
    espaceLimite: 104857600, // 100 MB
    role: environment.defaultUserRole // Utilise la configuration
  };

  constructor(private http: HttpClient, private router: Router) {
    const utilisateurStocke = localStorage.getItem('utilisateurActuel');
    if (utilisateurStocke) {
      this.utilisateurActuelSubject.next(JSON.parse(utilisateurStocke));
    }
  }

  // Méthode pour créer un token mock temporaire (développement uniquement)
  creerTokenMock(): void {
    localStorage.setItem('token', 'mock-jwt-token-dev-' + Date.now());
    localStorage.setItem('utilisateurActuel', JSON.stringify(this.utilisateurMock));
    this.utilisateurActuelSubject.next(this.utilisateurMock);
  }

  // Méthode pour promouvoir temporairement un utilisateur en admin (développement uniquement)
  promouvoirEnAdminTemporaire(): void {
    const utilisateurActuel = this.obtenirUtilisateurActuel();
    if (utilisateurActuel) {
      const utilisateurAdmin = { ...utilisateurActuel, role: 'admin' as const };
      localStorage.setItem('utilisateurActuel', JSON.stringify(utilisateurAdmin));
      this.utilisateurActuelSubject.next(utilisateurAdmin);
    }
  }

  // Méthode pour revenir à un utilisateur normal (développement uniquement)
  revenirUtilisateurNormal(): void {
    const utilisateurActuel = this.obtenirUtilisateurActuel();
    if (utilisateurActuel) {
      const utilisateurNormal = { ...utilisateurActuel, role: 'utilisateur' as const };
      localStorage.setItem('utilisateurActuel', JSON.stringify(utilisateurNormal));
      this.utilisateurActuelSubject.next(utilisateurNormal);
    }
  }

  seConnecter(donnees: DemandeConnexion): Observable<ReponseAuth> {
    // Simulation d'une connexion réussie
    const reponse: ReponseAuth = {
      token: 'mock-jwt-token-' + Date.now(),
      utilisateur: this.utilisateurMock
    };
    
    return of(reponse).pipe(
      delay(1000), // Simulation d'un délai réseau
      map(reponse => {
        localStorage.setItem('token', reponse.token);
        localStorage.setItem('utilisateurActuel', JSON.stringify(reponse.utilisateur));
        this.utilisateurActuelSubject.next(reponse.utilisateur);
        return reponse;
      })
    );
    
    // Code original pour l'API réelle
    // return this.http.post<ReponseAuth>(`${this.urlApi}/auth/connexion`, donnees)
    //   .pipe(
    //     map(reponse => {
    //       localStorage.setItem('token', reponse.token);
    //       localStorage.setItem('utilisateurActuel', JSON.stringify(reponse.utilisateur));
    //       this.utilisateurActuelSubject.next(reponse.utilisateur);
    //       return reponse;
    //     })
    //   );
  }

  sInscrire(donnees: DemandeInscription): Observable<ReponseAuth> {
    // Simulation d'une inscription réussie
    const nouvelUtilisateur: Utilisateur = {
      id: Date.now().toString(),
      nomUtilisateur: donnees.nomUtilisateur,
      email: donnees.email,
      espaceUtilise: 0,
      espaceLimite: 104857600 // 100 MB
    };
    
    const reponse: ReponseAuth = {
      token: 'mock-jwt-token-' + Date.now(),
      utilisateur: nouvelUtilisateur
    };
    
    return of(reponse).pipe(delay(1500));
    
    // Code original pour l'API réelle
    // return this.http.post<ReponseAuth>(`${this.urlApi}/auth/inscription`, donnees);
  }

  seDeconnecter(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('utilisateurActuel');
    this.utilisateurActuelSubject.next(null);
    this.router.navigate(['/']);
  }

  estConnecte(): boolean {
    return !!localStorage.getItem('token');
  }

  obtenirToken(): string | null {
    return localStorage.getItem('token');
  }

  obtenirUtilisateurActuel(): Utilisateur | null {
    return this.utilisateurActuelSubject.value;
  }
}
