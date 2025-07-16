/**
 * Middleware global de gestion des erreurs
 * Intercepte toutes les erreurs Express non gérées
 */
const errorHandler = (err, req, res, next) => {
  console.error('[Erreur Serveur]', err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Une erreur interne est survenue';

  res.status(statusCode).json({
    success: false,
    message, 
  });
};

module.exports = errorHandler;
