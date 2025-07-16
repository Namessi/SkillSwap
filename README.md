Backend - Application mobile SkillSwap

Ce dépôt contient le backend complet de SkillSwap, une application mobile native d’échange de compétences entre particuliers, basée sur la géolocalisation.

Chaque utilisateur peut :

- Proposer ou rechercher des compétences (cours, services, aides diverses)
- Visualiser des profils proches via une carte interactive
- Discuter en privé via une messagerie sécurisée
- Gagner des superlikes en réussissant des quiz
- Suivre des tutoriels courts (vidéos, conseils)
- Gérer son profil, ses préférences, sa visibilité et ses disponibilités
- Signaler, bloquer ou ajouter en favori d'autres utilisateurs

Ce backend a été développé en Node.js, structuré selon le modèle MVC (Modèle - Vue - Contrôleur) et connecté à une base de données MySQL.

📅 État actuel : le backend est quasi finalisé. Il reste à connecter la base MySQL dans .env, créer les tables via schema.sql, et tester les routes via Postman.

🔧 Technologies & Modules utilisés

- Node.js
- Express.js
- MySQL2
- dotenv
- jsonwebtoken
- bcryptjs
- cors
- morgan
- nodemon

📁 Structure du projet


📁 ProjetSkillSwap:

📁 controllers :

- abonnements.controller.js
- admin.controller.js
- auth.controller.js
- blocage.controller.js
- carte.controller.js
- competence.controller.js
- crossing.controller.js
- disponibilite.controller.js
- favoris.controller.js
- localisation.controller.js
- match.controller.js
- messages.controller.js
- notifications.controller.js
- parametres.controller.js
- public.controller.js
- quizz.controller.js
- signalements.controller.js
- suggestions.controller.js
- support.controller.js
- tableauDeBord.controller.js
- tutoriels.controller.js
- utilisateurs.controller.js
- visibilite.controller.js

📁 models :

- abonnements.model.js
- admin.model.js
- auth.model.js
- blocage.model.js
- carte.model.js
- competence.model.js
- crossing.model.js
- disponibilite.model.js
- favoris.model.js
- localisation.model.js
- match.model.js
- messages.model.js
- notifications.model.js
- parametres.model.js
- public.model.js
- quizz.model.js
- signalements.model.js
- suggestions.model.js
- support.model.js
- tableauDeBord.model.js
- tutoriels.model.js
- utilisateurs.model.js
- visibilite.model.js

📁 routes :

- abonnements.js
- admin.js
- auth.js
- blocage.js
- carte.js
- competence.js
- crossing.js
- disponibilite.js
- favoris.js
- localisation.js
- match.js
- messages.js
- notifications.js
- parametres.js
- public.js
- quizz.js
- signalements.js
- suggestions.js
- support.js
- tableauDeBord.js
- tutoriels.js
- utilisateurs.js
- visibilite.js
 
📁 database :

- dbConnection.js
- requetes.js
- schema.sql

📁 middleware :

- authMiddleware.js

📁 utils :

- errorHandler.js
- jwtHelper.js
- passwordUtils.js

Fichiers racine :

server.js
.env
.gitignore
package.json
README.md

✅ Fonctionnalités principales

- Authentification sécurisée avec JWT
- Gestion des utilisateurs, profils, blocages, signalements
- Matching, likes et superlikes
- Suggestions personnalisées
- Ajout, suppression, autocomplétion de compétences
- Carte interactive avec géolocalisation
- Messagerie privée entre utilisateurs
- Quiz débloquant des superlikes
- Tutoriels (vidéos courtes par thème)
- Notifications, favoris et abonnements
- Paramètres utilisateur (visibilité, langue, thème, horaires...)
- Statistiques dans le tableau de bord admin


📌 Exemples de points de terminaison

🔐 Authentification

POST /api/auth/register → Créer un compte
POST /api/auth/login → Connexion et JWT

👤 Utilisateurs

GET /api/utilisateurs → Liste des utilisateurs (admin)
GET /api/utilisateurs/:id → Récupérer un utilisateur
PUT /api/utilisateurs/:id → Modifier un utilisateur
DELETE /api/utilisateurs/:id → Supprimer un utilisateur

💬 Messages

POST /api/messages → Envoyer un message
GET /api/messages/:userId → Récupérer l’historique

💡 Compétences

POST /api/competence → Ajouter une compétence
GET /api/competence/:userId → Voir compétences
DELETE /api/competence/:id → Supprimer une compétence

📍 Localisation

PUT /api/localisation/:userId → Mise à jour position
GET /api/localisation/proches/:userId → Voir utilisateurs proches

💘 Match

POST /api/match/like → Like un profil
POST /api/match/superlike → Superlike un profil
GET /api/match/:userId → Voir les matchs

📚 Tutoriels & Quiz

GET /api/tutoriels/:categorie → Voir les vidéos
POST /api/quizz/:userId/reponse → Soumettre une réponse
GET /api/quizz/:userId → Voir les quiz disponibles

🔔 Notifications

GET /api/notifications/:userId → Récupérer les notifs

🛠️ Paramètres

GET /api/parametres/:userId → Voir préférences
PUT /api/parametres/:userId → Modifier préférences


🧪 Tests réalisés (à venir)

Toutes les routes répertoriées ci-dessus seront testées avec Postman, incluant :

- Inscription, connexion et authentification JWT
- Gestion complète des utilisateurs
- Matching et superlikes
- Transactions de messagerie
- Ajout, recherche, suppression de compétences
- Notifications et tutoriels
- Paramètres utilisateur
- Gestion des abonnements
- Quiz et score


✅ Bonnes pratiques

- Architecture MVC respectée
- Gestion centralisée des erreurs (errorHandler)
- Protection des routes avec JWT (authMiddleware)
- Variables sensibles dans .env
- Code clair, commenté, indenté
- Routes RESTful cohérentes
- Mots de passe hashés avec bcryptjs


🔐 Sécurité

- Authentification JWT sécurisée
- Contrôle d’accès par rôles (admin, utilisateur)
- Protection des routes sensibles avec middleware d’authentification

📂 Étapes suivantes

- Connexion MySQL via fichier .env
- Exécution du script schema.sql dans Workbench
- Tests de toutes les routes avec Postman
- Création du frontend avec React Native
- Déploiement de l’API sur Render ou Railway

✍️ Auteur

Kossi Boris Namessi Développeur Web & Mobile Full Stack – Formation RNCP – 2025📩 boris.namessi@outlook.fr

