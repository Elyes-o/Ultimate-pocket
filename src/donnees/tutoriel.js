// Tutoriel : un combat guidé par Impa contre un "Mannequin" qui ne fait que se concentrer.
// Les decks et les PV sont fixés pour que chaque étape tombe juste :
//   Tour 1 (3 ⚡)  : Urbosa attaque (1 ⚡) → KO du Bokoblin
//   Tour 3 (4 ⚡)  : retraite d'Urbosa (3 ⚡) → Riju entre en jeu
//   Tour 5 (3 ⚡)  : se concentrer (+1) → 4 ⚡
//   Tour 7 (6 ⚡)  : Terry (+2) et Tablette Sheikah (+1) → 9 ⚡ → Ultime « Foudre du Désert » (8 ⚡)
//   Ensuite : le joueur finit seul (dernier KO).

export const deckJoueurTutoriel = { combattants: [9, 13, 12, 10, 1], supporter: 15, objet: 21 }
export const deckBotTutoriel = { combattants: [16, 18, 17], supporter: 3, objet: 20 }

// PV des cartes du Mannequin (plus bas que la normale pour un combat court)
export const pvBotTutoriel = { 16: 50, 18: 90, 17: 60 }

// Étapes du guide.
//   attend : ce qui fait passer à l'étape suivante
//     'suivant'      → bouton « Suivant » dans la bulle
//     'ouvrirCarte'  → toucher sa carte active
//     'attaque'      → attaquer (cible 'attaque0' = seulement la 1re attaque)
//     'retraite'     → toucher « Retraite » dans le menu de la carte
//     'changement' / 'concentration' / 'supporter' / 'objet' / 'ultime' → jouer cette action
//     'tourJoueur'   → attendre que le bot ait joué
//   cible : l'élément mis en avant ; tout le reste est désactivé pendant l'étape
export const etapesTutoriel = [
  {
    texte: "Bienvenue ! Je suis Impa. Pour gagner, mets KO 3 cartes de l'adversaire avant qu'il ne mette KO les tiennes.",
    attend: 'suivant',
  },
  {
    texte: "Voici ta jauge d'Énergie ⚡. Elle gagne 2 ⚡ à chacun de tes tours, et chaque attaque en coûte. Gère-la bien !",
    attend: 'suivant',
    cible: 'jauge',
  },
  { texte: 'Touche Urbosa, ta carte active, pour voir ses attaques.', attend: 'ouvrirCarte', cible: 'carteActive' },
  { texte: 'Brise-Roc Cimeterre ne coûte que 1 ⚡. Touche-la pour frapper !', attend: 'attaque', cible: 'attaque0' },
  { texte: "KO ! L'adversaire envoie une nouvelle carte. Attaquer termine ton tour : attends le sien…", attend: 'tourJoueur' },
  {
    texte: 'Pour changer de carte active, touche Urbosa puis « Retraite ».',
    attend: 'ouvrirCarte',
    cible: 'carteActive',
  },
  {
    texte: "La retraite coûte de l'Énergie (ici 3 ⚡) et termine ton tour. Touche « Retraite ».",
    attend: 'retraite',
    cible: 'retraite',
  },
  { texte: 'Choisis Riju pour la faire entrer en jeu.', attend: 'changement' },
  { texte: 'Riju est en jeu. Au tour de ton adversaire…', attend: 'tourJoueur' },
  {
    texte: "Tu n'as que 3 ⚡. « Se concentrer » donne +1 ⚡ mais termine ton tour. Essaie !",
    attend: 'concentration',
    cible: 'concentration',
  },
  { texte: "Tu stockes de l'Énergie pour un grand coup. Patience…", attend: 'tourJoueur' },
  {
    texte: 'Les Supporters et les Objets sont gratuits et ne finissent pas ton tour. Touche Terry et joue-le : +2 ⚡.',
    attend: 'supporter',
    cible: 'supporter',
  },
  { texte: 'Maintenant la Tablette Sheikah : +1 ⚡.', attend: 'objet', cible: 'objet' },
  {
    texte: 'Urbosa et Riju sont dans ton équipe : leur Ultime en combo est prêt ! Lance « Foudre du Désert ».',
    attend: 'ultime',
    cible: 'ultime',
  },
  {
    texte: "Magnifique ! Si une carte d'un combo est KO, son Ultime est perdu : protège-les. Il te reste un KO : finis le combat seul !",
    attend: 'suivant',
  },
]
