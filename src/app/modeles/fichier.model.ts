// ========================
// src/app/modeles/fichier.model.ts
// ========================
export interface ElementFichier {
  id: string;
  nom: string;
  type: 'fichier' | 'dossier';
  taille?: number;
  dateCreation: Date;
  dateModification: Date;
  dossierId?: string;
  chemin: string;
  extension?: string;
  typeMime?: string;
}

export interface ElementFilAriane {
  id: string;
  nom: string;
  chemin: string;
}

export interface ProgressionUpload {
  nomFichier: string;
  progression: number;
  statut: 'upload' | 'termine' | 'erreur';
}
