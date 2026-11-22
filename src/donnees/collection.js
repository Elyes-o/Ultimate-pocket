// Règles de la Collection : recyclage des doublons et paliers de récompenses.
// Valeurs PROVISOIRES (un booster coûte 100 Éclats) : à équilibrer plus tard.

// Éclats gagnés en recyclant UN doublon, selon la rareté de la carte (1 à 4 étoiles, 5 = secrète)
export const VALEUR_RECYCLAGE = { 1: 5, 2: 10, 3: 25, 4: 60, 5: 150 } // 5 = carte secrète

// Paliers de CHAQUE collection : une récompense à réclamer à 25, 50, 75 et 100 %
export const paliersCollection = [
  { id: 'p25', pourcentage: 25, eclats: 100, tickets: 0 },
  { id: 'p50', pourcentage: 50, eclats: 200, tickets: 1 },
  { id: 'p75', pourcentage: 75, eclats: 300, tickets: 2 },
  { id: 'p100', pourcentage: 100, eclats: 500, tickets: 3, titre: true }, // le titre dépend de la collection (cartes.js)
]

// Nombre de cartes différentes à posséder pour atteindre un palier (arrondi au-dessus)
export function cartesRequises(palier, total) {
  return Math.ceil((palier.pourcentage / 100) * total)
}
