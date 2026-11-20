// Thème de l'application : TOUTES les couleurs, tailles et polices sont ici.
// Pour changer le look du jeu, on modifie ce fichier et pas les écrans.
//
// Direction artistique (2026-11-20) : « classeur de collectionneur ».
//   - fond blanc bleuté avec deux faisceaux de fines lignes turquoise → rose (comme TCG Pocket), panneaux blancs « en relief »
//   - encre bleu nuit pour le texte, Lagon pour les actions, Or pour tout ce qui est rare ou gagné
//   - police M PLUS Rounded 1c (ronde, typique des jeux mobiles japonais)
//   - boutons de jeu : une tranche plus foncée en bas, comme un vrai bouton qu'on enfonce

export const couleurs = {
  // Fonds
  fond: '#F8FAFC', // fond général : blanc bleuté (les vagues de lignes sont dessinées dessus)
  surface: '#FFFFFF', // panneaux, bandeaux, barre de navigation
  surfaceDouce: '#E7EFF5', // zones secondaires (silhouettes, barres vides)
  tranche: '#CFDDE8', // « épaisseur » sous les panneaux (relief)

  // Textes
  texte: '#1B2B48', // encre : texte principal (bleu nuit)
  texteSecondaire: '#5E7089', // descriptions, légendes
  texteInverse: '#FFFFFF', // texte sur fond foncé

  // Couleur principale du jeu (boutons, onglet actif)
  principale: '#0FA3C2', // Lagon
  principaleFoncee: '#0A7891', // tranche des boutons, textes sur fond clair
  principaleClaire: '#DDF3F8',

  // Monnaie et récompenses
  eclat: '#1FB6E6', // les Éclats (cristal bleu)
  ticket: '#F2B21B', // Or : Tickets, récompenses, rare
  ticketFonce: '#C98A06',
  etoile: '#F2B21B', // étoiles de rareté
  succes: '#21A86B', // booster prêt
  danger: '#F0584A', // Corail : PV bas, défaite

  // Univers
  zelda: '#2F9E62',
  onePiece: '#E2483D',
  hollowKnight: '#3B4A6B',

  bordure: '#D9E4EC',
}

// Espacements : toujours des multiples de 4 pour un rendu régulier
export const espaces = {
  xs: 4,
  s: 8,
  m: 12,
  l: 16,
  xl: 24,
  xxl: 32,
}

// Arrondis des coins
export const rayons = {
  petit: 8,
  moyen: 14,
  grand: 20,
  enorme: 28,
  rond: 999,
}

// Polices : M PLUS Rounded 1c (ronde, lisible, ambiance jeu mobile japonais)
export const polices = {
  normale: 'MPLUSRounded1c_500Medium',
  grasse: 'MPLUSRounded1c_700Bold',
  tresGrasse: 'MPLUSRounded1c_800ExtraBold',
  titre: 'MPLUSRounded1c_900Black',
}

// Tailles de texte
export const tailles = {
  petite: 12,
  normale: 15,
  moyenne: 17,
  grande: 22,
  titre: 28,
}

// Relief des panneaux : une tranche bleutée en bas + une ombre courte teintée (pas un flou gris générique)
export const ombre = {
  borderBottomWidth: 3,
  borderBottomColor: '#CFDDE8',
  shadowColor: '#24577A',
  shadowOpacity: 0.1,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 3 },
  elevation: 3,
}

// Relief des boutons de jeu (à ajouter au style d'un bouton plein)
export const reliefBouton = {
  borderBottomWidth: 4,
  borderBottomColor: 'rgba(0, 0, 0, 0.22)',
}

// Place à laisser en bas des écrans : la barre de navigation flotte par-dessus
export const ESPACE_BARRE_NAVIGATION = 96

// Rapport largeur / hauteur des cartes (images 400 x 560)
export const RATIO_CARTE = 400 / 560

// Rapport largeur / hauteur des paquets de booster illustrés (environ 360 x 635)
export const RATIO_BOOSTER = 360 / 635
