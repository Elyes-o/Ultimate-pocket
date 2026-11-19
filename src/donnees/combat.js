// Données de combat des cartes (validées par Elyes, voir CARTES_COMBAT.md).
// Les numéros sont ceux de cartes.js. Les effets utilisent un petit vocabulaire commun :
//   zone          : dégâts à chaque carte du banc adverse
//   bouclier      : dégâts en moins au prochain tour adverse (sur l'attaquant)
//   soinBanc      : soigne la carte la plus blessée de ton banc
//   energieAdverse: Énergie retirée à l'adversaire
//   recul         : l'attaquant se blesse lui-même
//   bloque        : l'actif adverse ne peut pas changer de place au prochain tour
//   ignoreBouclier: les Boucliers adverses ne comptent pas
//   critique      : { energieMin, bonus } bonus si l'adversaire a au moins energieMin Énergie
//   bonusParProdige: bonus par Prodige sur ton banc
//   fatigue       : l'attaquant ne peut pas attaquer à ton prochain tour

// Combattants : numéro de carte → fiche de combat
export const fichesCombattants = {
  1: {
    type: 'incolore', pv: 70, faiblesse: 'combat', retraite: 2,
    attaques: [
      { nom: 'Coup de Bâton', cout: 1, degats: 20 },
      { nom: "Tir à l'Arc d'Exercice", cout: 2, degats: 30, effets: { zone: 10 } },
    ],
  },
  16: {
    type: 'tenebres', pv: 60, faiblesse: 'fee', retraite: 1,
    attaques: [
      { nom: 'Coup de Gourdin', cout: 1, degats: 20 },
      { nom: 'Lancer de Corne', cout: 2, degats: 30 },
    ],
  },
  14: {
    type: 'psy', pv: 110, faiblesse: 'tenebres', retraite: 2,
    attaques: [{ nom: 'Serpe Furtive', cout: 2, degats: 70, effets: { critique: { energieMin: 6, bonus: 30 } } }],
  },
  17: {
    type: 'combat', pv: 130, faiblesse: 'plante', retraite: 2,
    attaques: [
      { nom: 'Écrasement Lourd', cout: 3, degats: 60, effets: { bouclier: 20 } },
      { nom: 'Lancer de Rocher Dévastateur', cout: 4, degats: 120, effets: { recul: 20 } },
    ],
  },
  10: {
    type: 'eau', pv: 130, faiblesse: 'electrique', retraite: 3,
    attaques: [
      { nom: 'Poste du Héros', cout: 1, degats: 30, effets: { soinBanc: 30 } },
      { nom: "Lance d'Écume Royale", cout: 3, degats: 90, effets: { bouclier: 30 } },
    ],
  },
  11: {
    type: 'feu', pv: 110, faiblesse: 'eau', retraite: 3,
    attaques: [
      { nom: 'Bouclier de Daruk', cout: 2, degats: 20, effets: { bouclier: 30 } },
      { nom: 'Roulade Enflammée', cout: 3, degats: 90 },
    ],
  },
  12: {
    type: 'incolore', pv: 100, faiblesse: 'electrique', retraite: 3,
    attaques: [
      { nom: 'Tir en Vol Direct', cout: 2, degats: 30 },
      { nom: 'Pluie de Flèches des Piafs', cout: 3, degats: 80, effets: { zone: 20 } },
    ],
  },
  13: {
    type: 'electrique', pv: 90, faiblesse: 'combat', retraite: 3,
    attaques: [
      { nom: 'Sabre des Gerudos', cout: 2, degats: 30, effets: { bouclier: 20 } },
      { nom: 'Frappe de Foudre Divine', cout: 3, degats: 100, effets: { zone: 20 } },
    ],
  },
  18: {
    type: 'feu', pv: 150, faiblesse: 'eau', retraite: 3,
    attaques: [
      { nom: 'Charge Féroce', cout: 2, degats: 50, effets: { bloque: true } },
      { nom: "Souffle d'Incinération", cout: 3, degats: 120, effets: { zone: 20, recul: 20 } },
    ],
  },
  19: {
    type: 'tenebres', pv: 140, faiblesse: 'electrique', retraite: 3,
    attaques: [
      { nom: 'Cible Verrouillée', cout: 1, degats: 30, effets: { bloque: true } },
      { nom: 'Rayon Laser Archéonique', cout: 2, degats: 20, effets: { zone: 20, energieAdverse: 1 } },
    ],
  },
  6: {
    type: 'eau', pv: 120, faiblesse: 'plante', retraite: 3,
    attaques: [{ nom: 'Trident Divin', cout: 2, degats: 60 }],
    talent: { id: 'priere', nom: 'Prière de Mipha', texte: 'Soin 50 à ton combattant le plus blessé' },
  },
  7: {
    type: 'combat', pv: 150, faiblesse: 'plante', retraite: 3,
    attaques: [{ nom: 'Écrasement Goron', cout: 3, degats: 130, effets: { recul: 20 } }],
    talent: { id: 'bouclierDaruk', nom: 'Bouclier de Daruk', texte: 'La prochaine attaque adverse fait 0 dégât' },
  },
  8: {
    type: 'incolore', pv: 150, faiblesse: 'electrique', retraite: 3,
    attaques: [{ nom: "Bourrasque de l'Arc de l'Aigle", cout: 2, degats: 60 }],
    talent: { id: 'rageRevali', nom: 'Rage de Revali', texte: 'Retraite gratuite ce tour' },
  },
  9: {
    type: 'electrique', pv: 130, faiblesse: 'combat', retraite: 3,
    attaques: [
      { nom: 'Brise-Roc Cimeterre', cout: 1, degats: 50, effets: { ignoreBouclier: true } },
      { nom: "Colère d'Urbosa", cout: 3, degats: 120, effets: { zone: 30 } },
    ],
  },
  23: {
    type: 'metal', pv: 250, faiblesse: 'tenebres', retraite: 5,
    attaques: [
      { nom: 'Module Cinétis', cout: 1, degats: 30, effets: { bloque: true } },
      { nom: 'Colère des Prodiges', cout: 3, degats: 180, effets: { bonusParProdige: 40, fatigue: true } },
    ],
  },
}

// Les 4 Prodiges (utile pour "Colère des Prodiges" et le combo)
export const numerosProdiges = [6, 7, 8, 9]

// Supporters et Objets : numéro → effet (appliqué par le moteur de combat)
export const fichesSupporters = {
  2: { effet: 'zelda', texte: 'Soin 40 à ton actif et +1 Énergie' },
  3: { effet: 'roi', texte: "+3 Énergie (+2 si l'adversaire a une carte 3★ ou plus)" },
  4: { effet: 'impa', texte: 'Échange ton actif, puis expose une carte du banc adverse' },
  5: { effet: 'pruha', texte: 'Ton Objet redevient utilisable' },
  15: { effet: 'terry', texte: '+2 Énergie' },
}

export const fichesObjets = {
  22: { effet: 'masterSword', texte: 'Prochaine attaque +60 (+110 si Link)' },
  20: { effet: 'paravoile', texte: 'Ton actif : retraite gratuite et Bouclier 20 permanent' },
  21: { effet: 'tablette', texte: '+1 Énergie, Talent adverse désactivé' },
}

// Ultimes = combos de cartes. "groupes" : il faut UNE carte de chaque groupe en vie dans l'équipe.
// "supporter" / "objet" : la carte doit être dans le deck et pas encore jouée.
// v1 : seuls les combos marqués "disponible: true" sont jouables.
export const combos = [
  {
    id: 'heros',
    nom: "Héros d'Hyrule",
    ultime: 'Lumière Sacrée',
    groupes: [[1, 23]],
    supporter: 2,
    cout: 8,
    degats: 200,
    zone: 0,
    disponible: true,
  },
  {
    id: 'prodiges',
    nom: 'Les Prodiges',
    ultime: 'Fureur des Prodiges',
    groupes: [[7], [8], [9], [6]],
    cout: 10,
    degats: 150,
    zone: 50,
    disponible: true,
  },
]

// Decks des bots (numéros de cartes)
export const decksBots = {
  facile: { combattants: [16, 17, 14, 19, 1], supporter: 15, objet: 20 },
  normal: { combattants: [12, 13, 10, 11, 18], supporter: 3, objet: 21 },
}

// Niveaux de bot affichés dans le menu Combat
export const niveauxBot = [
  { id: 'facile', nom: 'Facile', recompense: 20, disponible: true },
  { id: 'normal', nom: 'Normal', recompense: 40, disponible: true },
  { id: 'difficile', nom: 'Difficile', recompense: 80, disponible: false },
  { id: 'legendaire', nom: 'Légendaire', recompense: 120, disponible: false },
  { id: 'ultime', nom: 'Ultime', recompense: 200, disponible: false },
]

export const RECOMPENSE_DEFAITE = 5

// Catégorie d'une carte : 'combattant', 'supporter' ou 'objet'
export function categorieCarte(numero) {
  if (fichesCombattants[numero]) {
    return 'combattant'
  }
  if (fichesSupporters[numero]) {
    return 'supporter'
  }
  return 'objet'
}

// Noms affichés des types
export const nomsTypes = {
  incolore: 'Incolore', tenebres: 'Ténèbres', psy: 'Psy', combat: 'Combat', eau: 'Eau',
  feu: 'Feu', electrique: 'Électrique', metal: 'Métal', plante: 'Plante', fee: 'Fée',
}
