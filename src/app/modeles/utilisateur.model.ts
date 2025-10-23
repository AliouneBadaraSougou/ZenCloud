// ========================
// src/app/modeles/utilisateur.model.ts
// ========================
export interface Utilisateur {
  id: string;
  nomUtilisateur: string;
  email: string;
  espaceUtilise: number;
  espaceLimite: number;
  photoProfil?: string;
  dateInscription?: Date;
  telephone?: string; // Numéro de téléphone optionnel
  dernierAcces?: Date;
  role?: 'utilisateur' | 'admin'; // Rôle pour distinguer les admins
  preferencesNotification?: PreferencesNotification;
}

export interface PreferencesNotification {
  notificationsEmail: boolean;
  notificationsPush: boolean;
  synchronisationAuto: boolean;
  typesNotifications: {
    nouveaux_partages: boolean;
    modifications_fichiers: boolean;
    espace_stockage_faible: boolean;
    mises_a_jour_securite: boolean;
  };
}

export interface DemandeConnexion {
  email: string;
  motDePasse: string;
  seRappelerDeMoi?: boolean;
}

export interface DemandeInscription {
  nomUtilisateur: string;
  email: string;
  motDePasse: string;
  confirmerMotDePasse: string;
}

export interface ReponseAuth {
  token: string;
  utilisateur: Utilisateur;
}