require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const initDBConnection = require('./database/dbConnection');
initDBConnection(); // Connexion unique ici
const errorHandler = require('./utils/errorHandler');

const app = express();

// Création du serveur HTTP
const http = require('http').createServer(app);

// Intégration de Socket.IO
const { Server } = require('socket.io');
const io = new Server(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Événements Socket.IO
io.on('connection', (socket) => {
  console.log('🟢 Nouvel utilisateur connecté via WebSocket');

  socket.on('message', (data) => {
    console.log('📨 Message reçu :', data);
    io.emit('message', data); // diffusion à tous les clients
  });

  socket.on('disconnect', () => {
    console.log('🔴 Utilisateur déconnecté');
  });
});

app.use(cors());
app.use(express.json());
app.use(helmet());

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
const gamificationRoutes = require('./routes/gamification.routes');
const defisRoutes = require('./routes/defis.routes');
const actualitesRoutes = require('./routes/actualites.routes');
const suggestionIARoutes = require('./routes/suggestionIA.routes');
const agendaRoutes = require('./routes/agenda.routes');
const duelQuizzRoutes = require('./routes/duelQuizz.routes');
const boutiqueRoutes = require('./routes/boutique.routes');
const recompensesRoutes = require('./routes/recompenses.routes');
const traductionRoutes = require('./routes/traduction.routes');
const pushRoutes = require('./routes/push.routes');
const chatRoutes = require('./routes/chat.routes');

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
app.use('/api/gamification', gamificationRoutes);
app.use('/api/defis', defisRoutes);
app.use('/api/actualites', actualitesRoutes);
app.use('/api/suggestionia', suggestionIARoutes);
app.use('/api/agenda', agendaRoutes);
app.use('/api/duelquizz', duelQuizzRoutes);
app.use('/api/boutique', boutiqueRoutes);
app.use('/api/recompenses', recompensesRoutes);
app.use('/api/traduction', traductionRoutes);
app.use('/api/push', pushRoutes);
app.use('/api/chat', chatRoutes);

// Middleware de gestion des erreurs
app.use(errorHandler);

// Démarrage du serveur HTTP avec Socket.IO
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur le port ${PORT} 🚀`);
});
