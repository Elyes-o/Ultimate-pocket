// Thème de l'application : TOUTES les couleurs, tailles et polices sont ici.
// Pour changer le look du jeu, on modifie ce fichier et pas les écrans.

export const couleurs = {
  // Fonds
  fond: '#F2F4FA', // fond général, gris très clair un peu bleuté
  surface: '#FFFFFF', // cartes, bandeaux, barre de navigation
  surfaceDouce: '#E8ECF5', // zones secondaires (silhouettes, barres vides)

  // Textes
  texte: '#171E33', // texte principal (bleu nuit presque noir)
  texteSecondaire: '#6A7390', // descriptions, légendes
  texteInverse: '#FFFFFF', // texte sur fond foncé

  // Couleur principale du jeu (boutons, onglet actif)
  principale: '#5B4CF5',
  principaleFoncee: '#3F2FD8',
  principaleClaire: '#ECEAFF',

  // Monnaie et récompenses
  eclat: '#1FB6E6', // les Éclats (cristal bleu)
  ticket: '#F5A524', // les Tickets (orange doré)
  etoile: '#F7B731', // étoiles de rareté
  succes: '#22B573', // booster prêt

  // Univers
  zelda: '#2F9E62',
  onePiece: '#E2483D',
  hollowKnight: '#3B4A6B',

  bordure: '#E1E5EF',
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

// Polices (Nunito : ronde et lisible, adaptée à un jeu)
export const polices = {
  normale: 'Nunito_600SemiBold',
  grasse: 'Nunito_700Bold',
  tresGrasse: 'Nunito_800ExtraBold',
  titre: 'Nunito_900Black',
}

// Tailles de texte
export const tailles = {
  petite: 12,
  normale: 15,
  moyenne: 17,
  grande: 22,
  titre: 28,
}

// Ombre douce réutilisable (cartes, bandeaux)
export const ombre = {
  shadowColor: '#1B2440',
  shadowOpacity: 0.08,
  shadowRadius: 16,
  shadowOffset: { width: 0, height: 6 },
  elevation: 4,
}

// Place à laisser en bas des écrans : la barre de navigation flotte par-dessus
export const ESPACE_BARRE_NAVIGATION = 96

// Rapport largeur / hauteur des cartes (images 400 x 560)
export const RATIO_CARTE = 400 / 560

// Rapport largeur / hauteur des paquets de booster illustrés (environ 360 x 635)
export const RATIO_BOOSTER = 360 / 635
