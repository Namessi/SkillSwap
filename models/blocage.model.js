const db = require('../database/dbConnection');

exports.bloquerUtilisateur = (bloqueur_id, bloque_id, callback) => {
    const sql = `
        INSERT IGNORE INTO blocages (bloqueur_id, bloque_id)
        VALUES (?, ?)
    `;
    db.query(sql, [bloqueur_id, bloque_id], callback);
};

exports.debloquerUtilisateur = (bloqueur_id, bloque_id, callback) => {
    db.query('DELETE FROM blocages WHERE bloqueur_id = ? AND bloque_id = ?', [bloqueur_id, bloque_id], callback);
};

exports.estBloque = (userA, userB, callback) => {
    const sql = `
        SELECT * FROM blocages
        WHERE (bloqueur_id = ? AND bloque_id = ?)
           OR (bloqueur_id = ? AND bloque_id = ?)
    `;
    db.query(sql, [userA, userB, userB, userA], callback);
};

exports.getBlocagesUtilisateur = (id, callback) => {
    const sql = `
        SELECT u.id, u.nom, u.prenom, b.date_blocage
        FROM blocages b
        JOIN utilisateurs u ON u.id = b.bloque_id
        WHERE b.bloqueur_id = ?
    `;
    db.query(sql, [id], callback);
};
