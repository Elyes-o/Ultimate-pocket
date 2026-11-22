import { fichesCombattants } from './combat'

// Les cartes du jeu, rangées par collection (BOTW, TOTK…).
// "rarete" = nombre d'étoiles imprimées sur la carte (1 à 4), ou 5 = SECRÈTE (logo arc-en-ciel).
// "possedee" = cartes possédées AU DÉPART (fausse donnée v1). Ensuite, c'est JoueurContexte
// qui sait quelles cartes le joueur possède (elles changent quand on ouvre un booster).

export const cartesZelda = [
  { numero: 1, nom: 'Link', image: require('../../images/link.webp'), rarete: 1, possedee: true },
  { numero: 2, nom: 'Zelda', image: require('../../images/zelda.webp'), rarete: 3, possedee: true },
  { numero: 3, nom: 'Le Roi d\'Hyrule', image: require('../../images/le-roi-d-hyrule.webp'), rarete: 2, possedee: false },
  { numero: 4, nom: 'Impa', image: require('../../images/impa.webp'), rarete: 1, possedee: true },
  { numero: 5, nom: 'Pru\'ha', image: require('../../images/pru-ha.webp'), rarete: 1, possedee: false },
  { numero: 6, nom: 'Mipha', image: require('../../images/mipha.webp'), rarete: 3, possedee: false },
  { numero: 7, nom: 'Daruk', image: require('../../images/daruk.webp'), rarete: 3, possedee: false },
  { numero: 8, nom: 'Revali', image: require('../../images/revali.webp'), rarete: 3, possedee: false },
  { numero: 9, nom: 'Urbosa', image: require('../../images/urbosa.webp'), rarete: 3, possedee: true },
  { numero: 10, nom: 'Prince Sidon', image: require('../../images/sidon.webp'), rarete: 2, possedee: true },
  { numero: 11, nom: 'Yunobo', image: require('../../images/yunobo.webp'), rarete: 2, possedee: false },
  { numero: 12, nom: 'Teba', image: require('../../images/teba.webp'), rarete: 2, possedee: true },
  { numero: 13, nom: 'Riju', image: require('../../images/riju.webp'), rarete: 2, possedee: false },
  { numero: 14, nom: 'Sooga', image: require('../../images/sooga.webp'), rarete: 1, possedee: false },
  { numero: 15, nom: 'Terry', image: require('../../images/terry.webp'), rarete: 1, possedee: false },
  { numero: 16, nom: 'Bokoblin', image: require('../../images/bokoblin.webp'), rarete: 1, possedee: true },
  { numero: 17, nom: 'Hinox', image: require('../../images/hinox.webp'), rarete: 1, possedee: true },
  { numero: 18, nom: 'Lynel', image: require('../../images/lynel.webp'), rarete: 2, possedee: false },
  { numero: 19, nom: 'Gardien', image: require('../../images/gardien.webp'), rarete: 2, possedee: false },
  { numero: 20, nom: 'Paravoile', image: require('../../images/paravoile.webp'), rarete: 1, possedee: true },
  { numero: 21, nom: 'Tablette Sheikah', image: require('../../images/tablette-sheikah.webp'), rarete: 1, possedee: false },
  { numero: 22, nom: 'Master Sword', image: require('../../images/master-sword.webp'), rarete: 4, possedee: false },
  { numero: 23, nom: 'Link (Prodige)', image: require('../../images/link-2.webp'), rarete: 4, possedee: false },
]

// Les 34 cartes de la collection Zelda : Tears of the Kingdom (numéros 101 à 134).
// Images dans images/totk-cartes/ (dossier non publié sur GitHub, comme images/).
const imagesTotk = {
  101: require('../../images/totk-cartes/bokoblin.webp'),
  102: require('../../images/totk-cartes/chuchu.webp'),
  103: require('../../images/totk-cartes/korogu.webp'),
  104: require('../../images/totk-cartes/like-like.webp'),
  105: require('../../images/totk-cartes/moblin.webp'),
  106: require('../../images/totk-cartes/gibdo.webp'),
  107: require('../../images/totk-cartes/sbire-yiga.webp'),
  108: require('../../images/totk-cartes/babil.webp'),
  109: require('../../images/totk-cartes/riju.webp'),
  110: require('../../images/totk-cartes/sidon.webp'),
  111: require('../../images/totk-cartes/yunobo.webp'),
  112: require('../../images/totk-cartes/kohga.webp'),
  113: require('../../images/totk-cartes/lynel-d-argent.webp'),
  114: require('../../images/totk-cartes/roi-griock.webp'),
  115: require('../../images/totk-cartes/babil-sage.webp'),
  116: require('../../images/totk-cartes/riju-sage.webp'),
  117: require('../../images/totk-cartes/prince-sidon.webp'),
  118: require('../../images/totk-cartes/yunobo-sage.webp'),
  119: require('../../images/totk-cartes/mineru.webp'),
  120: require('../../images/totk-cartes/link-ex.webp'),
  121: require('../../images/totk-cartes/zelda-ex.webp'),
  122: require('../../images/totk-cartes/ganondorf-vmax.webp'),
  123: require('../../images/totk-cartes/noia.webp'),
  124: require('../../images/totk-cartes/pru-ha.webp'),
  125: require('../../images/totk-cartes/rauru.webp'),
  126: require('../../images/totk-cartes/dragon-blanc.webp'),
  127: require('../../images/totk-cartes/bananes-lame.webp'),
  128: require('../../images/totk-cartes/bouclier-d-hylia.webp'),
  129: require('../../images/totk-cartes/fee-en-bouteille.webp'),
  130: require('../../images/totk-cartes/master-sword.webp'),
  131: require('../../images/totk-cartes/daruk-ex.webp'),
  132: require('../../images/totk-cartes/mipha-ex.webp'),
  133: require('../../images/totk-cartes/revali-ex.webp'),
  134: require('../../images/totk-cartes/urbosa-ex.webp'),
}

// Nom et rareté de chaque carte TOTK (l'image vient de imagesTotk)
const listeTotk = [
  [101, 'Bokoblin', 1], [102, 'Chuchu', 1], [103, 'Korogu', 1], [104, 'Like Like', 1], [105, 'Moblin', 1],
  [106, 'Gibdo', 1], [107, 'Sbire Yiga', 1],
  [108, 'Babil', 2], [109, 'Riju', 2], [110, 'Sidon', 2], [111, 'Yunobo', 2], [112, 'Kohga', 2],
  [113, "Lynel d'Argent", 2], [114, 'Roi Griock', 2],
  [115, 'Babil, Sage du Vent', 3], [116, 'Riju, Sage de la Foudre', 3], [117, 'Prince Sidon, Sage de l\'Eau', 3],
  [118, 'Yunobo, Sage du Feu', 3], [119, "Mineru, Sage de l'Esprit", 3],
  [120, 'Link ex', 4], [121, 'Zelda ex', 4], [122, 'Ganondorf VMAX', 4],
  [123, 'Noïa', 1], [124, "Pru'ha", 3], [125, 'Rauru', 3], [126, 'Dragon Blanc', 3],
  [127, 'Bananes Lame', 1], [128, "Bouclier d'Hylia", 2], [129, 'Fée en Bouteille', 2], [130, 'Master Sword', 3],
  [131, 'Daruk ex', 5], [132, 'Mipha ex', 5], [133, 'Revali ex', 5], [134, 'Urbosa ex', 5],
]

export const cartesTotk = listeTotk.map(([numero, nom, rarete]) => ({
  numero,
  nom,
  image: imagesTotk[numero],
  rarete,
  possedee: false, // aucune carte TOTK au départ : on les gagne dans le booster « Royaume céleste »
}))

// ---------- Ordre et numéro des cartes dans leur collection ----------
// Règle d'Elyes : plus le numéro est haut, plus la carte est dure à obtenir.
//   1. d'abord par rareté (1★ … 4★, puis les secrètes) ;
//   2. à rareté égale, de la plus faible à la plus forte (les combattants d'abord, puis Supporters et Objets).
// Le numéro affiché (« N° 007 ») est la place dans la collection : il ne change PAS l'identifiant `numero`
// de la carte (utilisé par les sauvegardes, les decks et les combos).

// Force d'un combattant : PV + sa plus grosse attaque (+ un bonus s'il a un Talent ou des dégâts de zone)
function forceCarte(carte) {
  const fiche = fichesCombattants[carte.numero]
  if (!fiche) {
    return null // Supporter ou Objet
  }
  let meilleureAttaque = 0
  for (const attaque of fiche.attaques) {
    const valeur = attaque.degats + (attaque.effets && attaque.effets.zone ? attaque.effets.zone * 2 : 0)
    meilleureAttaque = Math.max(meilleureAttaque, valeur)
  }
  return fiche.pv + meilleureAttaque * 1.5 + (fiche.talent ? 30 : 0)
}

// Range les cartes d'une collection et leur donne leur numéro de collection (1, 2, 3…)
function rangerCollection(cartes) {
  const rangees = cartes.slice().sort((carteA, carteB) => {
    if (carteA.rarete !== carteB.rarete) {
      return carteA.rarete - carteB.rarete
    }
    const forceA = forceCarte(carteA)
    const forceB = forceCarte(carteB)
    if (forceA === null || forceB === null) {
      // Les combattants avant les Supporters / Objets ; entre eux, on garde l'ordre de départ
      return (forceA === null ? 1 : 0) - (forceB === null ? 1 : 0)
    }
    return forceA - forceB
  })
  rangees.forEach((carte, index) => {
    carte.numeroCollection = index + 1
  })
  return rangees
}

// Les collections, dans l'ordre d'affichage
export const collections = [
  { id: 'botw', univers: 'zelda', nom: 'Breath of the Wild', nomCourt: 'BOTW', cartes: rangerCollection(cartesZelda), titre: "Maître d'Hyrule" },
  { id: 'totk', univers: 'zelda', nom: 'Tears of the Kingdom', nomCourt: 'TOTK', cartes: rangerCollection(cartesTotk), titre: 'Gardien des Sages' },
]

// Toutes les cartes du jeu, toutes collections confondues
export const toutesLesCartes = collections.flatMap((collection) => collection.cartes)

// Petite fonction pour retrouver une carte par son numéro (dans n'importe quelle collection)
export function trouverCarte(numero) {
  return toutesLesCartes.find((carte) => carte.numero === Number(numero))
}

// La collection d'une carte
export function collectionDe(numero) {
  return collections.find((collection) => collection.cartes.some((carte) => carte.numero === Number(numero)))
}

// Rareté 5 = carte secrète (logo arc-en-ciel)
export const RARETE_SECRETE = 5
