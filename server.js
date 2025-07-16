require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./database/dbconnection');
const errorHandler = require('./utils/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

// Import des routes
const abonnementsRoutes = require('./routes/abonnements.routes');
const adminRoutes = require('./routes/admin.routes');
const authRoutes = require('./routes/auth.routes');
const competencesRoutes = require('./routes/competence.routes');
const favorisRoutes = require('./routes/favoris.routes');
const messagesRoutes = require('./routes/messages.routes');
const notificationsRoutes = require('./routes/notifications.routes');
const parametresRoutes = require('./routes/parametres.routes');
const quizzRoutes = require('./routes/quizz.routes');
const signalementsRoutes = require('./routes/signalements.routes');
const supportRoutes = require('./routes/support.routes');
const tableaudebordRoutes = require('./routes/tableaudebord.routes');
const tutorielsRoutes = require('./routes/tutoriels.routes');
const utilisateursRoutes = require('./routes/utilisateurs.routes');
const localisationRoutes = require('./routes/localisation.routes');
const matchRoutes = require('./routes/match.routes');
const carteRoutes = require('./routes/carte.routes');
const crossingRoutes = require('./routes/crossing.routes');
const blocageRoutes = require('./routes/blocage.routes');
const visibiliteRoutes = require('./routes/visibilite.routes');
const disponibiliteRoutes = require('./routes/disponibilite.routes');
const suggestionsRoutes = require('./routes/suggestions.routes');
const publicRoutes = require('./routes/public.routes');

// Montage des routes
app.use('/api/abonnements', abonnementsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/competences', competencesRoutes);
app.use('/api/favoris', favorisRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/parametres', parametresRoutes);
app.use('/api/quizz', quizzRoutes);
app.use('/api/signalements', signalementsRoutes);
app.use('/api/support', supportRoutes);
app.use('/api/tableaudebord', tableaudebordRoutes);
app.use('/api/tutoriels', tutorielsRoutes);
app.use('/api/utilisateurs', utilisateursRoutes);
app.use('/api/localisation', localisationRoutes);
app.use('/api/match', matchRoutes);
app.use('/api/carte', carteRoutes);
app.use('/api/croisements', crossingRoutes);
app.use('/api/blocage', blocageRoutes);
app.use('/api/visibilite', visibiliteRoutes);
app.use('/api/disponibilites', disponibiliteRoutes);
app.use('/api/suggestions', suggestionsRoutes);
app.use('/api/public', publicRoutes);

// Middleware de gestion des erreurs (à placer après les routes)
app.use(errorHandler);

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur le port ${PORT} 🚀`);
});
