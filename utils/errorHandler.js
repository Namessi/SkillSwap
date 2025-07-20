/**
 * Middleware global de gestion des erreurs
 * Intercepte toutes les erreurs Express non gérées
 */
const errorHandler = (err, req, res, next) => {
  // Affiche la stack trace de l’erreur dans la console pour le débogage
  console.error('[Erreur Serveur]', err.stack);

  // Utilise le code d’erreur fourni ou 500 par défaut (erreur serveur)
  const statusCode = err.statusCode || 500;

  // Utilise le message d’erreur fourni ou un message générique
  const message = err.message || 'Une erreur interne est survenue';

  // Envoie une réponse JSON contenant le statut et le message d’erreur
  res.status(statusCode).json({
    success: false,
    message, 
  });
};

// Exportation du middleware pour l’utiliser dans l’app Express
module.exports = errorHandler;
