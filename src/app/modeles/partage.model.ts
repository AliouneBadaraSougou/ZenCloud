export interface PartageOptions {
  fichierId: string;
  nomFichier: string;
  typePartage: 'lien' | 'email' | 'utilisateur';
  permissions: 'lecture' | 'ecriture' | 'admin';
  expiration?: Date;
  motDePasse?: string;
  destinataires?: string[];
  message?: string;
}

export interface LienPartage {
  id: string;
  fichierId: string;
  nomFichier: string;
  lien: string;
  permissions: 'lecture' | 'ecriture' | 'admin';
  dateCreation: Date;
  dateExpiration?: Date;
  motDePasse?: boolean;
  nombreAcces: number;
  actif: boolean;
}

export interface PartageUtilisateur {
  id: string;
  fichierId: string;
  nomFichier: string;
  utilisateurId: string;
  nomUtilisateur: string;
  emailUtilisateur: string;
  permissions: 'lecture' | 'ecriture' | 'admin';
  datePartage: Date;
  dateExpiration?: Date;
  statut: 'en_attente' | 'accepte' | 'refuse';
}

export interface StatistiquesPartage {
  nombrePartages: number;
  nombreAcces: number;
  derniereActivite?: Date;
  partageLePlusPopulaire?: {
    nomFichier: string;
    nombreAcces: number;
  };
}