// Configuration pour l'environnement de production
export const environment = {
  production: true,
  apiUrl: 'https://votre-api.com/api', // À remplacer par votre URL d'API
  enableMockAuth: false, // Désactivé en production
  enableDevButtons: false, // Désactivé en production
  defaultUserRole: 'utilisateur' as const // Utilisateur normal par défaut en production
};
