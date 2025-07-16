const Quizz = require('../models/quizz.model');

// ✅ Récupérer tous les quiz
exports.getAllQuizz = (req, res) => {
  Quizz.getAll((err, results) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });
    res.json(results.map(q => ({
      id: q.id,
      question: q.question,
      reponses_possibles: JSON.parse(q.reponses_possibles),
      categorie: q.categorie
    })));
  });
};

// ✅ Récupérer un quiz par ID
exports.getQuizzById = (req, res) => {
  const id = req.params.id;
  Quizz.getById(id, (err, results) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });
    if (results.length === 0) return res.status(404).json({ message: 'Quizz non trouvé' });

    const q = results[0];
    res.json({
      id: q.id,
      question: q.question,
      reponse_correcte: q.reponse_correcte,
      reponses_possibles: JSON.parse(q.reponses_possibles),
      categorie: q.categorie
    });
  });
};

// ✅ Créer un quiz (admin)
exports.createQuizz = (req, res) => {
  const { question, reponse_correcte, reponses_possibles, categorie } = req.body;

  if (!question || !reponse_correcte || !reponses_possibles || !categorie) {
    return res.status(400).json({ message: 'Champs manquants' });
  }

  Quizz.create({ question, reponse_correcte, reponses_possibles, categorie }, (err, result) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });
    res.status(201).json({ message: 'Quizz créé avec succès', quizzId: result.insertId });
  });
};

// ✅ Mettre à jour un quiz
exports.updateQuizz = (req, res) => {
  const id = req.params.id;
  const { question, reponse_correcte, reponses_possibles, categorie } = req.body;

  if (!question || !reponse_correcte || !reponses_possibles || !categorie) {
    return res.status(400).json({ message: 'Champs manquants' });
  }

  Quizz.update(id, { question, reponse_correcte, reponses_possibles, categorie }, (err) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });
    res.json({ message: 'Quizz mis à jour avec succès' });
  });
};

// ✅ Supprimer un quiz
exports.deleteQuizz = (req, res) => {
  const id = req.params.id;
  Quizz.delete(id, (err) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });
    res.json({ message: 'Quizz supprimé avec succès' });
  });
};

// ✅ Répondre à un quiz avec gestion des essais (max 5)
exports.answerQuizz = (req, res) => {
  const { userId, quizzId, reponse } = req.body;

  if (!userId || !quizzId || reponse === undefined) {
    return res.status(400).json({ message: 'Champs requis : userId, quizzId, reponse' });
  }

  Quizz.getById(quizzId, (err, results) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur' });
    if (results.length === 0) return res.status(404).json({ message: 'Quizz non trouvé' });

    const quizz = results[0];
    const bonneReponse = quizz.reponse_correcte;

    Quizz.getAttemptCount(userId, quizzId, (err, attemptResults) => {
      if (err) return res.status(500).json({ message: 'Erreur serveur' });

      let essais = attemptResults.length ? attemptResults[0].essais : 0;

      const isCorrect = String(reponse).trim().toLowerCase() === String(bonneReponse).trim().toLowerCase();

      if (isCorrect) {
        Quizz.resetAttempts(userId, quizzId, () => {});
        Quizz.ajouterSuperlike(userId, () => {}); // ✅ bonus superlike ici
        return res.json({ correct: true, message: 'Bonne réponse ! Superlike gagné.', essais: essais + 1 });
      }

      essais++;
      Quizz.recordAttempt(userId, quizzId, essais, () => {});

      if (essais === 2) {
        return res.json({
          correct: false,
          essais,
          message: '2 erreurs. Voir la bonne réponse ou retenter ?',
          proposeShowAnswer: true,
          proposeRetry: true
        });
      } else if (essais >= 5) {
        Quizz.resetAttempts(userId, quizzId, () => {});
        return res.json({
          correct: false,
          essais,
          message: '5 essais échoués. Voici la bonne réponse.',
          bonneReponse
        });
      }

      return res.json({
        correct: false,
        essais,
        message: `Mauvaise réponse. Il vous reste ${5 - essais} essais.`
      });
    });
  });
};

// ✅ Soumission rapide (type mini-quiz)
exports.repondreQuiz = (req, res) => {
  const utilisateur_id = req.user.id;
  const { quiz_id, bonne_reponse } = req.body;

  Quizz.enregistrerReponse(utilisateur_id, quiz_id, bonne_reponse, (err) => {
    if (err) return res.status(500).json({ message: "Erreur enregistrement quiz", err });

    if (bonne_reponse) {
      Quizz.ajouterSuperlike(utilisateur_id, (err) => {
        if (err) return res.status(500).json({ message: "Erreur ajout superlike", err });
        return res.status(200).json({ message: "Bonne réponse ! 1 superlike gagné." });
      });
    } else {
      res.status(200).json({ message: "Réponse enregistrée, mais incorrecte." });
    }
  });
};

// ✅ Nombre de superlikes disponibles
exports.mesSuperlikes = (req, res) => {
  Quizz.getSuperlikes(req.user.id, (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur récupération", err });
    res.status(200).json({ superlikes: result[0].superlikes });
  });
};
