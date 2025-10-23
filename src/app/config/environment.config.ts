// Configuration pour les environnements de développement et production
export interface EnvironmentConfig {
  production: boolean;
  apiUrl: string;
  enableMockAuth: boolean;
  enableDevButtons: boolean;
  defaultUserRole: 'utilisateur' | 'admin';
}

export const environment: EnvironmentConfig = {
  production: false, // À changer en true pour la production
  apiUrl: 'http://localhost:3000/api',
  enableMockAuth: true, // Désactiver quand le backend est prêt
  enableDevButtons: true, // Désactiver pour la production
  defaultUserRole: 'admin' // 'admin' pour le développement, 'utilisateur' pour la production
};
