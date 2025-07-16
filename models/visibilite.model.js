const db = require('../database/dbConnection');

exports.getVisibilite = (utilisateur_id, callback) => {
    db.query('SELECT profil_public FROM utilisateurs WHERE id = ?', [utilisateur_id], callback);
};

exports.setVisibilite = (utilisateur_id, etat, callback) => {
    db.query('UPDATE utilisateurs SET profil_public = ? WHERE id = ?', [etat, utilisateur_id], callback);
};
