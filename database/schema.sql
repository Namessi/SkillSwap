-- Table 1 : permissions
-- Cette table contient la liste des permissions disponibles dans l'application.
-- Exemple : "edit_user", "delete_post", etc.

CREATE TABLE IF NOT EXISTS permissions (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT 'Identifiant unique de la permission',
  nom VARCHAR(100) NOT NULL UNIQUE COMMENT 'Nom de la permission (ex : "edit_user")',
  description TEXT COMMENT 'Description détaillée de cette permission',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Date de création',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Date de dernière mise à jour'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Table des permissions système';



-- Table 2 : roles
-- Cette table définit les différents rôles d'utilisateurs (ex : Admin, Utilisateur, Modérateur)

CREATE TABLE IF NOT EXISTS roles (
  id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identifiant unique du rôle',
  nom VARCHAR(50) NOT NULL UNIQUE COMMENT 'Nom du rôle (ex : "admin", "utilisateur")',
  description VARCHAR(255) COMMENT 'Description facultative du rôle'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Table des rôles utilisateur';

-- Insertion de rôles de base (peut être adaptée selon le projet)
INSERT INTO roles (nom, description) VALUES 
('admin', 'Administrateur disposant de tous les droits'),
('utilisateur', 'Utilisateur standard'),
('moderateur', 'Modérateur avec accès limité');



-- Table 3 : role_permissions
-- Cette table fait le lien entre les rôles et les permissions.
-- Un rôle peut avoir plusieurs permissions, et une permission peut appartenir à plusieurs rôles.

CREATE TABLE IF NOT EXISTS role_permissions (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT 'ID unique du lien rôle-permission',
  role_id INT UNSIGNED NOT NULL COMMENT 'ID du rôle (FK vers roles.id)',
  permission_id INT UNSIGNED NOT NULL COMMENT 'ID de la permission (FK vers permissions.id)',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Date de création du lien',

  -- Clés étrangères
  CONSTRAINT fk_role_permissions_role FOREIGN KEY (role_id)
    REFERENCES roles(id) ON DELETE CASCADE ON UPDATE CASCADE,

  CONSTRAINT fk_role_permissions_permission FOREIGN KEY (permission_id)
    REFERENCES permissions(id) ON DELETE CASCADE ON UPDATE CASCADE,

  -- Empêche l'association en double d'une permission à un même rôle
  UNIQUE KEY unique_role_permission (role_id, permission_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Association des permissions aux rôles';




-- Table 4 : utilisateurs
-- Cette table contient les informations des comptes utilisateurs de l'application.

CREATE TABLE IF NOT EXISTS utilisateurs (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT 'Identifiant unique de l\'utilisateur',
  nom VARCHAR(100) NOT NULL COMMENT 'Nom complet de l\'utilisateur',
  email VARCHAR(255) NOT NULL UNIQUE COMMENT 'Adresse email unique de l\'utilisateur',
  mot_de_passe VARCHAR(255) NOT NULL COMMENT 'Mot de passe hashé',
  role_id INT UNSIGNED NOT NULL COMMENT 'Rôle attribué à l\'utilisateur (FK vers roles.id)',
  profil_public BOOLEAN DEFAULT TRUE COMMENT 'Détermine si le profil est visible publiquement',
  superlikes INT DEFAULT 0 COMMENT 'Nombre de superlikes disponibles pour l\'utilisateur',
  date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Date de création du compte',
  date_modification TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Date de la dernière modification du compte',
  actif BOOLEAN DEFAULT TRUE COMMENT 'Statut du compte (actif ou non)',

  CONSTRAINT fk_utilisateurs_role FOREIGN KEY (role_id)
  REFERENCES roles(id) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Informations des utilisateurs de l\'application';




-- Table 5 : parametres
-- Contient des paires clé/valeur définies par les utilisateurs (préférences personnalisées)

CREATE TABLE IF NOT EXISTS parametres (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT 'Identifiant unique du paramètre',
  utilisateur_id INT UNSIGNED NOT NULL COMMENT 'ID de l\'utilisateur concerné',
  clé VARCHAR(100) NOT NULL COMMENT 'Nom du paramètre (clé)',
  valeur TEXT COMMENT 'Valeur associée à la clé',
  date_modification TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Date de dernière modification',

  CONSTRAINT fk_parametres_utilisateur FOREIGN KEY (utilisateur_id)
    REFERENCES utilisateurs(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Paramètres personnalisés des utilisateurs';




-- Table 6 : abonnements
-- Stocke les informations sur les abonnements des utilisateurs (gratuit, premium...)

CREATE TABLE IF NOT EXISTS abonnements (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT 'Identifiant unique de l’abonnement',
  utilisateur_id INT UNSIGNED NOT NULL COMMENT 'ID de l\'utilisateur concerné',
  type VARCHAR(50) NOT NULL COMMENT 'Type d’abonnement (ex : gratuit, premium)',
  date_debut DATETIME NOT NULL COMMENT 'Date de début de l’abonnement',
  date_fin DATETIME DEFAULT NULL COMMENT 'Date de fin de l’abonnement (NULL = en cours)',
  statut ENUM('actif', 'inactif', 'annulé') NOT NULL DEFAULT 'actif' COMMENT 'État actuel de l’abonnement',
  date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Date de création de l’abonnement',

  CONSTRAINT fk_abonnements_utilisateur FOREIGN KEY (utilisateur_id)
    REFERENCES utilisateurs(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Historique des abonnements des utilisateurs';




-- Table 7 : competences
-- Liste des compétences que les utilisateurs peuvent proposer ou maîtriser dans l'application.

CREATE TABLE IF NOT EXISTS competences (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT 'Identifiant unique de la compétence',
  nom VARCHAR(100) NOT NULL UNIQUE COMMENT 'Nom de la compétence (ex: JavaScript, Cuisine)',
  description TEXT DEFAULT NULL COMMENT 'Description détaillée de la compétence',
  user_id INT UNSIGNED NOT NULL COMMENT 'ID de l\'utilisateur ayant créé la compétence',
  date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Date de création de la compétence',
  date_modification TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Date de la dernière modification',
  
  INDEX idx_nom (nom), -- Optimisation de recherche par nom

  CONSTRAINT fk_competences_user FOREIGN KEY (user_id)
    REFERENCES utilisateurs(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Liste des compétences proposées dans l\'application';




-- Table 8 : utilisateur_competences
-- Association des compétences à chaque utilisateur, avec un niveau de maîtrise.

CREATE TABLE IF NOT EXISTS utilisateur_competences (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT 'Identifiant unique de la relation utilisateur-compétence',
  utilisateur_id INT UNSIGNED NOT NULL COMMENT 'ID de l\'utilisateur',
  competence_id INT UNSIGNED NOT NULL COMMENT 'ID de la compétence',
  niveau TINYINT UNSIGNED DEFAULT 1 COMMENT 'Niveau de maîtrise de 1 à 10',
  date_ajout TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Date d\'ajout de la compétence par l\'utilisateur',

  -- Clés étrangères
  CONSTRAINT fk_uc_utilisateur FOREIGN KEY (utilisateur_id)
    REFERENCES utilisateurs(id) ON DELETE CASCADE,

  CONSTRAINT fk_uc_competence FOREIGN KEY (competence_id)
    REFERENCES competences(id) ON DELETE CASCADE,

  -- Empêche qu'un utilisateur associe deux fois la même compétence
  UNIQUE KEY uq_utilisateur_competence (utilisateur_id, competence_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Compétences maîtrisées par chaque utilisateur';




-- Table 9 : favoris
-- Permet à un utilisateur de marquer un autre utilisateur comme favori.

CREATE TABLE IF NOT EXISTS favoris (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT 'Identifiant unique du favori',
  utilisateur_id INT UNSIGNED NOT NULL COMMENT 'ID de l\'utilisateur qui ajoute un favori',
  favori_utilisateur_id INT UNSIGNED NOT NULL COMMENT 'ID de l\'utilisateur ajouté en favori',
  date_ajout TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Date d\'ajout dans les favoris',

  -- Clés étrangères vers la table utilisateurs
  CONSTRAINT fk_favoris_utilisateur FOREIGN KEY (utilisateur_id)
    REFERENCES utilisateurs(id) ON DELETE CASCADE,

  CONSTRAINT fk_favoris_utilisateur_favori FOREIGN KEY (favori_utilisateur_id)
    REFERENCES utilisateurs(id) ON DELETE CASCADE,

  -- Empêche les doublons : un utilisateur ne peut ajouter qu’une fois un autre utilisateur en favori
  UNIQUE KEY uq_utilisateur_favori (utilisateur_id, favori_utilisateur_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Liste des utilisateurs favoris';




-- Table 10 : messages
-- Stocke les messages envoyés entre utilisateurs dans l'application.

CREATE TABLE IF NOT EXISTS messages (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT 'Identifiant unique du message',

  expediteur_id INT UNSIGNED NOT NULL COMMENT 'ID de l’utilisateur qui envoie le message',
  destinataire_id INT UNSIGNED NOT NULL COMMENT 'ID de l’utilisateur qui reçoit le message',

  contenu TEXT NOT NULL COMMENT 'Contenu du message',
  date_envoi TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Date et heure d’envoi du message',
  lu TINYINT(1) DEFAULT 0 COMMENT 'Statut de lecture (0 = non lu, 1 = lu)',

  -- Clés étrangères vers utilisateurs
  CONSTRAINT fk_messages_expediteur FOREIGN KEY (expediteur_id)
    REFERENCES utilisateurs(id) ON DELETE CASCADE,

  CONSTRAINT fk_messages_destinataire FOREIGN KEY (destinataire_id)
    REFERENCES utilisateurs(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Messages échangés entre utilisateurs';



-- Table 11 : notifications
-- Table des notifications envoyées aux utilisateurs

CREATE TABLE IF NOT EXISTS notifications (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT 'Identifiant unique de la notification',
  utilisateur_id INT UNSIGNED NOT NULL COMMENT 'ID de l\'utilisateur recevant la notification',
  titre VARCHAR(255) NOT NULL COMMENT 'Titre de la notification',
  message TEXT NOT NULL COMMENT 'Contenu de la notification',
  type VARCHAR(50) DEFAULT 'info' COMMENT 'Type de notification (info, alerte, succès, etc.)',
  date_envoi TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Date et heure de création de la notification',
  lue TINYINT(1) DEFAULT 0 COMMENT 'Statut de lecture (0 = non lue, 1 = lue)',

  -- Clé étrangère vers utilisateurs
  CONSTRAINT fk_notifications_utilisateur FOREIGN KEY (utilisateur_id)
    REFERENCES utilisateurs(id)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Table des notifications envoyées aux utilisateurs';



-- Table 12 : quizz
-- Table des quizz disponibles sur la plateforme

CREATE TABLE IF NOT EXISTS quizz (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY COMMENT 'Identifiant unique du quizz',
  titre VARCHAR(255) NOT NULL COMMENT 'Titre du quizz',
  description TEXT COMMENT 'Description ou résumé du quizz',
  niveau VARCHAR(50) DEFAULT 'facile' COMMENT 'Niveau de difficulté (facile, moyen, difficile)',
  categorie VARCHAR(100) COMMENT 'Catégorie du quizz (ex : compétences, culture générale, etc.)',
  date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Date de création du quizz',
  actif TINYINT(1) DEFAULT 1 COMMENT 'Statut actif (1 = actif, 0 = inactif)',

  INDEX idx_quizz_categorie (categorie)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Table des quizz disponibles sur la plateforme';



-- Table 13 : tentatives_quizz
-- Gère les tentatives effectuées par un utilisateur sur un quizz donné.

CREATE TABLE IF NOT EXISTS tentatives_quizz (
  id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identifiant unique de la tentative',
  utilisateur_id INT UNSIGNED NOT NULL COMMENT 'ID de l\'utilisateur',
  quizz_id INT UNSIGNED NOT NULL COMMENT 'ID du quizz tenté',
  nombre_tentatives INT NOT NULL DEFAULT 0 COMMENT 'Nombre total de tentatives',
  a_reussi BOOLEAN NOT NULL DEFAULT FALSE COMMENT 'Indique si l\'utilisateur a réussi',
  derniere_tentative DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Date de la dernière tentative',

  -- Clés étrangères
  CONSTRAINT fk_tentatives_user FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id) ON DELETE CASCADE,
  CONSTRAINT fk_tentatives_quizz FOREIGN KEY (quizz_id) REFERENCES quizz(id) ON DELETE CASCADE,

  -- Un utilisateur ne peut avoir qu'une seule ligne par quizz
  UNIQUE KEY unique_tentative (utilisateur_id, quizz_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Suivi des tentatives des utilisateurs pour chaque quizz';




-- Table 14 : resultats_quizz
-- Stocke les résultats des utilisateurs à chaque quizz.

CREATE TABLE IF NOT EXISTS resultats_quizz (
  id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identifiant unique du résultat',
  utilisateur_id INT UNSIGNED NOT NULL COMMENT 'ID de l\'utilisateur concerné',
  quizz_id INT UNSIGNED NOT NULL COMMENT 'ID du quizz',
  score INT NOT NULL COMMENT 'Score obtenu au quizz',
  date_resultat DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Date d\'enregistrement du résultat',

  -- Clés étrangères
  CONSTRAINT fk_resultats_user FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id) ON DELETE CASCADE,
  CONSTRAINT fk_resultats_quizz FOREIGN KEY (quizz_id) REFERENCES quizz(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Résultats des utilisateurs pour chaque quizz';




-- Table 15 : signalements
-- Enregistre les signalements effectués par les utilisateurs (ex : message inapproprié, utilisateur, etc.)

CREATE TABLE IF NOT EXISTS signalements (
  id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identifiant unique du signalement',
  utilisateur_id INT UNSIGNED NOT NULL COMMENT 'ID de l\'utilisateur ayant effectué le signalement',
  type_signalement VARCHAR(50) NOT NULL COMMENT 'Type de l\'élément signalé (ex : "message", "utilisateur", "contenu")',
  reference_id INT NOT NULL COMMENT 'ID de l\'objet signalé (message, utilisateur, etc.)',
  description TEXT COMMENT 'Description facultative du signalement',
  raison TEXT COMMENT 'Raison détaillée du signalement',
  statut ENUM('en_attente', 'en_cours', 'traite', 'resolu', 'rejete') DEFAULT 'en_attente' COMMENT 'Statut du signalement',
  date_signalement DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Date à laquelle le signalement a été effectué',

  -- Clé étrangère vers utilisateurs
  CONSTRAINT fk_signalement_utilisateur FOREIGN KEY (utilisateur_id)
    REFERENCES utilisateurs(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Signalements faits par les utilisateurs';



-- Table 16 : support
-- Permet aux utilisateurs de soumettre des tickets d'assistance à l'équipe de support.

CREATE TABLE IF NOT EXISTS support (
  id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identifiant unique du ticket',
  utilisateur_id INT UNSIGNED NOT NULL COMMENT 'Utilisateur ayant soumis le ticket',
  sujet VARCHAR(255) NOT NULL COMMENT 'Sujet du ticket',
  message TEXT NOT NULL COMMENT 'Contenu du message de support',
  statut ENUM('ouvert', 'en_cours', 'ferme') DEFAULT 'ouvert' COMMENT 'Statut du ticket de support',
  date_creation DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Date de création du ticket',
  date_maj DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Date de mise à jour',

  -- Clé étrangère
  CONSTRAINT fk_support_utilisateur FOREIGN KEY (utilisateur_id)
    REFERENCES utilisateurs(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tickets de support envoyés par les utilisateurs';




-- Table 17 : tutoriels
-- Contient des tutoriels vidéos, écrits ou autres créés par les utilisateurs.

CREATE TABLE IF NOT EXISTS tutoriels (
  id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identifiant unique du tutoriel',
  utilisateur_id INT COMMENT 'Auteur du tutoriel (peut être NULL si supprimé)',
  titre VARCHAR(255) NOT NULL COMMENT 'Titre du tutoriel',
  description TEXT COMMENT 'Description ou résumé',
  url_video VARCHAR(500) COMMENT 'Lien vers la vidéo (YouTube, Vimeo, etc.)',
  contenu TEXT COMMENT 'Contenu texte ou script du tutoriel',
  categorie VARCHAR(100) COMMENT 'Catégorie du tutoriel',
  date_creation DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Date de création',
  date_maj DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Dernière mise à jour',

  -- Clé étrangère
  CONSTRAINT fk_tutoriels_utilisateur FOREIGN KEY (utilisateur_id)
    REFERENCES utilisateurs(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tutoriels créés par les utilisateurs';




-- Table 18 : tableau_de_bord
-- Contient les préférences et données personnalisées d'affichage pour chaque utilisateur (widgets, stats, etc.)

CREATE TABLE IF NOT EXISTS tableau_de_bord (
  id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identifiant unique du tableau de bord',
  utilisateur_id INT UNSIGNED NOT NULL COMMENT 'ID de l\'utilisateur concerné',
  preferences JSON DEFAULT NULL COMMENT 'Préférences utilisateur (affichage, widgets, filtres...)',
  statistiques JSON DEFAULT NULL COMMENT 'Statistiques personnalisées (ex : graphiques, activités)',
  date_creation DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Date de création',
  date_maj DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Date de dernière mise à jour',

  -- Clé étrangère vers la table utilisateurs
  CONSTRAINT fk_dashboard_utilisateur FOREIGN KEY (utilisateur_id)
    REFERENCES utilisateurs(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tableau de bord personnalisé pour chaque utilisateur';




-- Table 19 : localisations
-- Stocke la position géographique et les préférences de recherche de chaque utilisateur.

CREATE TABLE IF NOT EXISTS localisations (
  id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identifiant unique de la localisation',
  utilisateur_id INT UNSIGNED NOT NULL COMMENT 'Utilisateur concerné',
  latitude DECIMAL(10, 8) NOT NULL COMMENT 'Latitude GPS',
  longitude DECIMAL(11, 8) NOT NULL COMMENT 'Longitude GPS',
  last_seen DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Dernière activité géolocalisée',
  rayon_recherche INT DEFAULT 50 COMMENT 'Rayon de recherche en kilomètres',
  ville VARCHAR(100) COMMENT 'Nom de la ville (facultatif)',

  -- Clé étrangère vers la table utilisateurs
  CONSTRAINT fk_localisations_utilisateur FOREIGN KEY (utilisateur_id)
    REFERENCES utilisateurs(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Positions et préférences de localisation des utilisateurs';




-- Table 20 : matchs
-- Enregistre les interactions "like" et "superlike" entre utilisateurs, et s'ils ont matché ou non.

CREATE TABLE IF NOT EXISTS matchs (
  id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identifiant unique du match',
  utilisateur_1 INT UNSIGNED NOT NULL COMMENT 'Utilisateur ayant envoyé un like/superlike',
  utilisateur_2 INT UNSIGNED NOT NULL COMMENT 'Utilisateur ciblé',
  type_like ENUM('like', 'superlike') NOT NULL COMMENT 'Type de like envoyé',
  date_like DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Date de l\'interaction',
  matched BOOLEAN DEFAULT FALSE COMMENT 'Indique si les deux utilisateurs ont matché',

  -- Clés étrangères
  CONSTRAINT fk_match_utilisateur_1 FOREIGN KEY (utilisateur_1)
    REFERENCES utilisateurs(id) ON DELETE CASCADE,
  CONSTRAINT fk_match_utilisateur_2 FOREIGN KEY (utilisateur_2)
    REFERENCES utilisateurs(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Historique des likes et matchs entre utilisateurs';



-- Table 21 : crossings
-- Enregistre les croisements physiques entre deux utilisateurs (façon Happn), avec la distance et l’horodatage.
CREATE TABLE IF NOT EXISTS crossings (
  id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identifiant unique du croisement',
  utilisateur_a INT UNSIGNED NOT NULL COMMENT 'Premier utilisateur impliqué dans le croisement',
  utilisateur_b INT UNSIGNED NOT NULL COMMENT 'Deuxième utilisateur impliqué',
  date_croisement DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Date et heure du croisement',
  distance_m DECIMAL(5,2) COMMENT 'Distance approximative entre les deux utilisateurs en mètres',

  CONSTRAINT fk_crossing_user_a FOREIGN KEY (utilisateur_a) REFERENCES utilisateurs(id) ON DELETE CASCADE,
  CONSTRAINT fk_crossing_user_b FOREIGN KEY (utilisateur_b) REFERENCES utilisateurs(id) ON DELETE CASCADE,
  
  UNIQUE KEY uq_crossing (utilisateur_a, utilisateur_b, date_croisement)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Historique des croisements entre utilisateurs';



-- Table 22 : blocages
-- Permet à un utilisateur d’en bloquer un autre, pour éviter toute interaction.

CREATE TABLE IF NOT EXISTS blocages (
  id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identifiant unique du blocage',
  bloqueur_id INT UNSIGNED NOT NULL COMMENT 'ID de l\'utilisateur qui bloque',
  bloque_id INT UNSIGNED NOT NULL COMMENT 'ID de l\'utilisateur bloqué',
  date_blocage DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Date du blocage',

  -- Empêche un utilisateur de bloquer plusieurs fois la même personne
  UNIQUE KEY unique_blocage (bloqueur_id, bloque_id),

  -- Clés étrangères
  CONSTRAINT fk_blocages_bloqueur FOREIGN KEY (bloqueur_id)
    REFERENCES utilisateurs(id) ON DELETE CASCADE,
  CONSTRAINT fk_blocages_bloque FOREIGN KEY (bloque_id)
    REFERENCES utilisateurs(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Blocages entre utilisateurs pour empêcher les interactions';



-- Table 23 : disponibilites
-- Représente les créneaux de disponibilité d’un utilisateur par jour.

CREATE TABLE IF NOT EXISTS disponibilites (
  id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identifiant unique du créneau',
  utilisateur_id INT UNSIGNED NOT NULL COMMENT 'ID de l\'utilisateur concerné',
  jour ENUM('lundi','mardi','mercredi','jeudi','vendredi','samedi','dimanche') NOT NULL COMMENT 'Jour de la semaine',
  heure_debut TIME NOT NULL COMMENT 'Heure de début de disponibilité',
  heure_fin TIME NOT NULL COMMENT 'Heure de fin de disponibilité',

  -- Clé étrangère
  CONSTRAINT fk_disponibilites_utilisateur FOREIGN KEY (utilisateur_id)
    REFERENCES utilisateurs(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Disponibilités hebdomadaires des utilisateurs';



-- Table 24 : suggestions_hebdo
-- Représente les suggestions d’utilisateurs proposées chaque semaine à un utilisateur donné.

CREATE TABLE IF NOT EXISTS suggestions_hebdo (
  id INT AUTO_INCREMENT PRIMARY KEY COMMENT 'Identifiant unique de la suggestion hebdomadaire',
  utilisateur_id INT UNSIGNED NOT NULL COMMENT 'Utilisateur qui reçoit la suggestion',
  suggestion_id INT UNSIGNED NOT NULL COMMENT 'Utilisateur suggéré (profil recommandé)',
  date_suggestion DATE DEFAULT CURRENT_DATE COMMENT 'Date de la suggestion (par défaut aujourd’hui)',

  -- Clés étrangères
  CONSTRAINT fk_suggestions_hebdo_utilisateur FOREIGN KEY (utilisateur_id)
    REFERENCES utilisateurs(id) ON DELETE CASCADE,
  CONSTRAINT fk_suggestions_hebdo_suggestion FOREIGN KEY (suggestion_id)
    REFERENCES utilisateurs(id) ON DELETE CASCADE,

  -- Évite les doublons pour un même jour
  UNIQUE KEY uq_suggestion_jour (utilisateur_id, suggestion_id, date_suggestion)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Suggestions d’utilisateurs affichées chaque semaine';




