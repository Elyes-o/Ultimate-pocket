// Tirage des cartes d'un booster (dans la collection du booster : BOTW, TOTK…).
// Un booster contient 5 cartes. Les 3 premières sont plutôt communes,
// les 2 dernières ont plus de chances d'être rares (comme dans les vrais jeux de cartes).
// Les pourcentages sont PROVISOIRES : à équilibrer plus tard.
import { collections } from './cartes'

// Chances (en %) d'obtenir chaque rareté (1 à 4 étoiles, 5 = secrète), emplacement par emplacement
const tablesDeChances = {
  // Booster classique
  normal: [
    { 1: 70, 2: 25, 3: 5, 4: 0 },
    { 1: 70, 2: 25, 3: 5, 4: 0 },
    { 1: 70, 2: 25, 3: 5, 4: 0 },
    { 1: 0, 2: 60, 3: 35, 4: 5 },
    { 1: 0, 2: 40, 3: 45, 4: 15 },
  ],
  // Booster Légendaire : au moins une carte 3★ garantie, 4★ bien plus fréquentes
  legendaire: [
    { 1: 50, 2: 35, 3: 15, 4: 0 },
    { 1: 50, 2: 35, 3: 15, 4: 0 },
    { 1: 50, 2: 35, 3: 15, 4: 0 },
    { 1: 0, 2: 30, 3: 55, 4: 15 },
    { 1: 0, 2: 0, 3: 60, 4: 40 },
  ],
  // Royaume céleste (TOTK) : comme le classique, mais les 2 dernières cartes peuvent être SECRÈTES (2 % et 5 %)
  totk: [
    { 1: 70, 2: 25, 3: 5, 4: 0 },
    { 1: 70, 2: 25, 3: 5, 4: 0 },
    { 1: 70, 2: 25, 3: 5, 4: 0 },
    { 1: 0, 2: 58, 3: 33, 4: 7, 5: 2 },
    { 1: 0, 2: 38, 3: 42, 4: 15, 5: 5 },
  ],
}

// Choisit une rareté au hasard selon les pourcentages donnés
function tirerRarete(chances) {
  const nombreAuHasard = Math.random() * 100
  let cumul = 0
  for (let rarete = 1; rarete <= 5; rarete++) {
    cumul = cumul + (chances[rarete] ?? 0)
    if (nombreAuHasard < cumul) {
      return rarete
    }
  }
  return 1
}

// Choisit une carte au hasard parmi celles de la rareté demandée.
// Si la collection n'a aucune carte de cette rareté, on prend la rareté juste en dessous.
function tirerCarteDeRarete(rarete, cartesDeLaCollection) {
  let cartesPossibles = cartesDeLaCollection.filter((carte) => carte.rarete === rarete)
  while (cartesPossibles.length === 0 && rarete > 1) {
    rarete = rarete - 1
    cartesPossibles = cartesDeLaCollection.filter((carte) => carte.rarete === rarete)
  }
  const index = Math.floor(Math.random() * cartesPossibles.length)
  return cartesPossibles[index]
}

// Renvoie les 5 cartes d'un booster. typeTirage : 'normal', 'legendaire' ou 'totk' ; idCollection : 'botw', 'totk'…
export function tirerBooster(typeTirage = 'normal', idCollection = 'botw') {
  const table = tablesDeChances[typeTirage] ?? tablesDeChances.normal
  const collection = collections.find((element) => element.id === idCollection) ?? collections[0]
  const cartesTirees = []
  for (const chances of table) {
    cartesTirees.push(tirerCarteDeRarete(tirerRarete(chances), collection.cartes))
  }
  return cartesTirees
}
