// serviceWorkerRegistration.js

// Remarque : ce fichier contient généralement des configurations pour l'enregistrement du service worker.
// Pour les besoins de base, il peut être laissé tel quel.

export const register = () => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
          console.log('Service Worker enregistré avec succès:', registration);
        }).catch(error => {
          console.error('Erreur lors de l\'enregistrement du Service Worker:', error);
        });
      });
    }
  };
  