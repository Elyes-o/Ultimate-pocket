// Cerveau des bots : choisit les actions du bot pour son tour.
// Renvoie une LISTE d'actions : d'abord les actions gratuites (Supporter, Objet, Talent), puis UNE action principale.
//   Facile     : joue au hasard, n'économise jamais, n'utilise pas de combos.
//   Normal     : prend la plus grosse attaque possible, lance un Ultime dès qu'il peut.
//   Difficile, Légendaire, Ultime ("intelligent") :
//     1. achève ton actif s'il peut le mettre KO
//     2. lance son Ultime dès qu'il peut
//     3. ÉCONOMISE son Énergie quand un Ultime est proche
//     4. casse TES combos (attaque de zone sur ton banc) quand ton Ultime approche
//     5. joue son Supporter, son Objet et son Talent au bon moment
import { actionsPossibles, ultimesDisponibles, ENERGIE_MAX, ENERGIE_CONCENTRATION } from './moteur'
import { fichesSupporters, fichesObjets, numerosProdiges } from '../donnees/combat'

const ENERGIE_PAR_TOUR = 2

function auHasard(liste) {
  return liste[Math.floor(Math.random() * liste.length)]
}

// ---------- Facile ----------

function choisirFacile(etat) {
  const possibles = actionsPossibles(etat, 'bot')
  const attaquesJouables = possibles.attaques.filter((element) => element.possible)
  const actions = []

  // Une chance sur deux de jouer son Objet / Supporter, sans réfléchir
  if (possibles.objetDispo && Math.random() < 0.5) {
    actions.push({ type: 'objet' })
  }
  if (possibles.supporterDispo && Math.random() < 0.5) {
    actions.push({ type: 'supporter' })
  }

  if (attaquesJouables.length > 0) {
    actions.push({ type: 'attaque', index: auHasard(attaquesJouables).index })
  } else {
    actions.push({ type: 'concentration' })
  }
  return actions
}

// ---------- Aides communes ----------

// Dégâts approximatifs d'une attaque du bot sur ton actif (faiblesse et Prodiges compris, sans les boucliers)
function degatsEstimes(etat, attaque) {
  const campBot = etat.camps.bot
  const cible = etat.camps.joueur.actif
  let degats = attaque.degats + campBot.bonusProchaineAttaque
  if (attaque.effets && attaque.effets.bonusParProdige) {
    const prodiges = campBot.banc.filter((combattant) => numerosProdiges.includes(combattant.numero)).length
    degats = degats + attaque.effets.bonusParProdige * prodiges
  }
  if (cible && cible.faiblesse === campBot.actif.type) {
    degats = degats * 2
  }
  return degats
}

// Dégâts que l'actif adverse encaisse vraiment (boucliers compris)
function degatsRecus(cible, degats, ignoreBouclier) {
  if (!ignoreBouclier) {
    if (cible.annuleProchaineAttaque) {
      return 0
    }
    return Math.max(0, degats - cible.bouclier - cible.bouclierPermanent)
  }
  return degats
}

function meilleureAttaque(etat, attaques) {
  let meilleure = null
  for (const element of attaques) {
    if (!meilleure || degatsEstimes(etat, element.attaque) > degatsEstimes(etat, meilleure.attaque)) {
      meilleure = element
    }
  }
  return meilleure
}

// ---------- Normal ----------

function choisirNormal(etat) {
  const possibles = actionsPossibles(etat, 'bot')
  const campBot = etat.camps.bot
  const actions = []

  const ultimeJouable = possibles.ultimes.find((element) => element.possible)
  if (ultimeJouable) {
    return [{ type: 'ultime', idCombo: ultimeJouable.combo.id }]
  }
  if (possibles.talentDispo) {
    actions.push({ type: 'talent' })
  }
  if (possibles.supporterDispo && campBot.energie < 3) {
    actions.push({ type: 'supporter' })
  }

  // Reculer si l'actif est presque KO et qu'un remplaçant en forme attend
  const actif = campBot.actif
  if (actif.pv <= actif.pvMax * 0.25 && possibles.peutChanger) {
    const indexRemplacant = indexDuPlusEnForme(campBot.banc)
    if (campBot.banc[indexRemplacant].pv > actif.pv) {
      actions.push({ type: 'changement', indexBanc: indexRemplacant })
      return actions
    }
  }

  const meilleure = meilleureAttaque(etat, possibles.attaques.filter((element) => element.possible))
  if (meilleure) {
    if (possibles.objetDispo) {
      actions.push({ type: 'objet' })
    }
    actions.push({ type: 'attaque', index: meilleure.index })
    return actions
  }
  actions.push({ type: 'concentration' })
  return actions
}

function indexDuPlusEnForme(combattants) {
  let meilleurIndex = 0
  for (let index = 1; index < combattants.length; index++) {
    if (combattants[index].pv > combattants[meilleurIndex].pv) {
      meilleurIndex = index
    }
  }
  return meilleurIndex
}

// ---------- Intelligent (Difficile, Légendaire, Ultime) ----------

// Actions gratuites jouées au bon moment
function actionsGratuitesIntelligentes(etat, possibles, ultimeVise) {
  const campBot = etat.camps.bot
  const campJoueur = etat.camps.joueur
  const actif = campBot.actif
  const actions = []

  // Talent
  if (possibles.talentDispo) {
    const talent = possibles.talent.id
    const unBlesse = [actif, ...campBot.banc].some((combattant) => combattant.pvMax - combattant.pv >= 50)
    if (talent === 'bouclierDaruk' || (talent === 'priere' && unBlesse)) {
      actions.push({ type: 'talent' })
    }
  }

  // Supporter
  if (possibles.supporterDispo) {
    const effet = fichesSupporters[campBot.supporter.numero].effet
    const supporterDansLeCombo = ultimeVise && ultimeVise.combo.supporter === campBot.supporter.numero
    if (!supporterDansLeCombo) {
      const energieUtile = (effet === 'roi' || effet === 'terry') && (campBot.energie < 3 || (ultimeVise && !ultimeVise.possible))
      const soinUtile = effet === 'zelda' && actif.pv <= actif.pvMax * 0.5
      const exposerUneProie = effet === 'impa' && campJoueur.banc.some((combattant) => combattant.pv <= 60)
      const objetARecharger = effet === 'pruha' && campBot.objet.utilise
      if (energieUtile || soinUtile || exposerUneProie || objetARecharger) {
        actions.push({ type: 'supporter' })
      }
    }
  }
  return actions
}

function choisirIntelligent(etat) {
  const possibles = actionsPossibles(etat, 'bot')
  const campBot = etat.camps.bot
  const campJoueur = etat.camps.joueur
  const actif = campBot.actif
  const cible = campJoueur.actif
  const attaquesJouables = possibles.attaques.filter((element) => element.possible)

  // L'Ultime que le bot vise (le premier réalisable)
  const ultimeVise = possibles.ultimes.length > 0 ? possibles.ultimes[0] : null
  const actions = actionsGratuitesIntelligentes(etat, possibles, ultimeVise)

  // Objet : Master Sword juste avant un gros coup, Paravoile si l'actif est blessé, Tablette contre un Talent adverse
  let objetAJouer = false
  if (possibles.objetDispo) {
    const effetObjet = fichesObjets[campBot.objet.numero].effet
    const objetDansLeCombo = ultimeVise && ultimeVise.combo.objet === campBot.objet.numero
    if (!objetDansLeCombo) {
      if (effetObjet === 'paravoile' && actif.pv <= actif.pvMax * 0.6) {
        actions.push({ type: 'objet' })
      } else if (effetObjet === 'tablette') {
        actions.push({ type: 'objet' })
      } else if (effetObjet === 'masterSword') {
        objetAJouer = true // joué juste avant l'attaque choisie plus bas
      }
    }
  }
  function avecAttaque(index) {
    if (objetAJouer) {
      actions.push({ type: 'objet' })
    }
    actions.push({ type: 'attaque', index })
    return actions
  }

  // 1. Achever ton actif s'il peut être mis KO maintenant
  for (const element of attaquesJouables) {
    const ignore = element.attaque.effets && element.attaque.effets.ignoreBouclier
    if (cible && degatsRecus(cible, degatsEstimes(etat, element.attaque), ignore) >= cible.pv) {
      return avecAttaque(element.index)
    }
  }

  // 2. Ultime dès qu'il est payable
  const ultimeJouable = possibles.ultimes.find((element) => element.possible)
  if (ultimeJouable) {
    actions.push({ type: 'ultime', idCombo: ultimeJouable.combo.id })
    return actions
  }

  // 3. Casser TON combo : si ton Ultime est presque prêt, on frappe ton banc avec une attaque de zone
  const menaces = ultimesDisponibles(etat, 'joueur')
  const menaceProche = menaces.some((element) => campJoueur.energie + ENERGIE_PAR_TOUR >= element.combo.cout)
  if (menaceProche) {
    const attaqueDeZone = attaquesJouables.find((element) => element.attaque.effets && element.attaque.effets.zone)
    if (attaqueDeZone) {
      return avecAttaque(attaqueDeZone.index)
    }
  }

  // 4. Reculer si l'actif va tomber et qu'un remplaçant en forme attend
  if (actif.pv <= actif.pvMax * 0.3 && possibles.peutChanger && campBot.banc.length > 0) {
    const indexRemplacant = indexDuPlusEnForme(campBot.banc)
    if (campBot.banc[indexRemplacant].pv > actif.pv * 2) {
      actions.push({ type: 'changement', indexBanc: indexRemplacant })
      return actions
    }
  }

  // 5. Économiser pour l'Ultime : on ne dépense que ce qui permet de l'avoir au prochain tour
  if (ultimeVise && !ultimeVise.possible) {
    const cout = ultimeVise.combo.cout
    const budget = campBot.energie + ENERGIE_PAR_TOUR - cout // ce qu'on peut dépenser maintenant
    const attaquesDansLeBudget = attaquesJouables.filter((element) => element.attaque.cout <= budget)
    if (attaquesDansLeBudget.length > 0) {
      return avecAttaque(meilleureAttaque(etat, attaquesDansLeBudget).index)
    }
    // Se concentrer rapproche de l'Ultime (+1 maintenant, +2 au début du prochain tour)
    if (campBot.energie + ENERGIE_CONCENTRATION + ENERGIE_PAR_TOUR >= cout && campBot.energie < ENERGIE_MAX) {
      actions.push({ type: 'concentration' })
      return actions
    }
  }

  // 6. Sinon : la plus grosse attaque possible
  const meilleure = meilleureAttaque(etat, attaquesJouables)
  if (meilleure) {
    return avecAttaque(meilleure.index)
  }
  actions.push({ type: 'concentration' })
  return actions
}

function choisirActionsDuBot(etat, niveau) {
  if (niveau === 'facile') {
    return choisirFacile(etat)
  }
  if (niveau === 'normal') {
    return choisirNormal(etat)
  }
  return choisirIntelligent(etat)
}

const ACTIONS_GRATUITES = ['supporter', 'objet', 'talent']

// Prochaine action du bot. On la redemande après CHAQUE action gratuite,
// car une action gratuite peut tout changer (ex. Impa change le combattant actif).
export function prochaineActionDuBot(etat, niveau) {
  return choisirActionsDuBot(etat, niveau)[0]
}

export function estActionGratuite(action) {
  return ACTIONS_GRATUITES.includes(action.type)
}
