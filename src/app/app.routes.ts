import { Routes, Router } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { ConnexionComponent } from './components/connexion/connexion.component';
import { InscriptionComponent } from './components/inscription/inscription.component';
import { TableauBordComponent } from './components/tableau-bord/tableau-bord.component';
import { ProfilComponent } from './components/profil/profil.component';
import { NouveauDossierComponent } from './components/nouveau-dossier/nouveau-dossier.component';
import { ImporterComponent } from './components/importer/importer.component';
import { RechercheComponent } from './components/recherche/recherche.component';
import { ExplorateurComponent } from './components/explorateur/explorateur.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminLoginComponent } from './components/admin-login/admin-login';
import { MotDePasseOublieComponent } from './components/mot-de-passe-oublie/mot-de-passe-oublie.component';
import { ReinitialisationMotDePasseComponent } from './components/reinitialisation-mot-de-passe/reinitialisation-mot-de-passe.component';
import { PageErreurComponent } from './components/page-erreur/page-erreur.component';
import { inject } from '@angular/core';
import { environment } from './config/environment.config';

// Garde personnalisé pour l'administration
const adminGuard = () => {
  const router = inject(Router);
  
  // Vérifier si le token administrateur existe
  if (localStorage.getItem('admin_token')) {
    return true;
  }
  
  // Rediriger vers la page de connexion administrateur
  router.navigate(['/admin-login']);
  return false;
};

export const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'accueil', component: AccueilComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'mot-de-passe-oublie', component: MotDePasseOublieComponent },
  { path: 'reinitialisation-mot-de-passe', component: ReinitialisationMotDePasseComponent },
  { 
    path: 'tableau-bord', 
    component: TableauBordComponent, 
    canActivate: environment.enableMockAuth ? [] : [/* AuthGuard à réactiver */]
  },
  { 
    path: 'profil', 
    component: ProfilComponent, 
    canActivate: environment.enableMockAuth ? [] : [/* AuthGuard à réactiver */]
  },
  { 
    path: 'nouveau-dossier', 
    component: NouveauDossierComponent, 
    canActivate: environment.enableMockAuth ? [] : [/* AuthGuard à réactiver */]
  },
  { 
    path: 'importer', 
    component: ImporterComponent, 
    canActivate: environment.enableMockAuth ? [] : [/* AuthGuard à réactiver */]
  },
  { 
    path: 'recherche', 
    component: RechercheComponent, 
    canActivate: environment.enableMockAuth ? [] : [/* AuthGuard à réactiver */]
  },
  { 
    path: 'explorateur', 
    component: ExplorateurComponent, 
    canActivate: environment.enableMockAuth ? [] : [/* AuthGuard à réactiver */]
  },
  { 
    path: 'admin', 
    component: AdminComponent,
    canActivate: [adminGuard]
  },
  { 
    path: 'admin-login', 
    component: AdminLoginComponent,
    canActivate: [() => !localStorage.getItem('admin_token')]
  },
  { 
    path: 'erreur', 
    component: PageErreurComponent 
  },
  { path: '**', component: PageErreurComponent }
];
