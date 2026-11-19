// Tirage des cartes d'un booster.
// Un booster contient 5 cartes. Les 3 premières sont plutôt communes,
// les 2 dernières ont plus de chances d'être rares (comme dans les vrais jeux de cartes).
// Les pourcentages sont PROVISOIRES : à équilibrer plus tard.
import { cartesZelda } from './cartes'

// Chances (en %) d'obtenir chaque rareté (1 à 4 étoiles), emplacement par emplacement
const chancesParEmplacement = [
  { 1: 70, 2: 25, 3: 5, 4: 0 },
  { 1: 70, 2: 25, 3: 5, 4: 0 },
  { 1: 70, 2: 25, 3: 5, 4: 0 },
  { 1: 0, 2: 60, 3: 35, 4: 5 },
  { 1: 0, 2: 40, 3: 45, 4: 15 },
]

// Choisit une rareté au hasard selon les pourcentages donnés
function tirerRarete(chances) {
  const nombreAuHasard = Math.random() * 100
  let cumul = 0
  for (let rarete = 1; rarete <= 4; rarete++) {
    cumul = cumul + chances[rarete]
    if (nombreAuHasard < cumul) {
      return rarete
    }
  }
  return 1
}

// Choisit une carte au hasard parmi celles de la rareté demandée
function tirerCarteDeRarete(rarete) {
  const cartesPossibles = cartesZelda.filter((carte) => carte.rarete === rarete)
  const index = Math.floor(Math.random() * cartesPossibles.length)
  return cartesPossibles[index]
}

// Renvoie les 5 cartes d'un booster Zelda
export function tirerBooster() {
  const cartesTirees = []
  for (const chances of chancesParEmplacement) {
    cartesTirees.push(tirerCarteDeRarete(tirerRarete(chances)))
  }
  return cartesTirees
}
