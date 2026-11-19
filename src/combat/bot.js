// Cerveau des bots : choisit les actions du bot pour son tour.
// Renvoie une LISTE d'actions : d'abord les actions gratuites (Supporter, Objet, Talent), puis UNE action principale.
//   Facile : joue au hasard, n'économise jamais, n'utilise pas de combos.
//   Normal : prend la plus grosse attaque possible, lance un Ultime dès qu'il peut,
//            recule avant de tomber KO, utilise son Supporter quand il manque d'Énergie.
import { actionsPossibles } from './moteur'

function auHasard(liste) {
  return liste[Math.floor(Math.random() * liste.length)]
}

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

// Dégâts approximatifs d'une attaque (sans compter boucliers ni effets)
function degatsEstimes(etat, attaque) {
  const actifBot = etat.camps.bot.actif
  const cible = etat.camps.joueur.actif
  let degats = attaque.degats
  if (cible && cible.faiblesse === actifBot.type) {
    degats = degats * 2
  }
  return degats
}

function choisirNormal(etat) {
  const possibles = actionsPossibles(etat, 'bot')
  const campBot = etat.camps.bot
  const actions = []

  // 1. Ultime dès qu'il est payable
  const ultimeJouable = possibles.ultimes.find((element) => element.possible)
  if (ultimeJouable) {
    return [{ type: 'ultime', idCombo: ultimeJouable.combo.id }]
  }

  // 2. Talent toujours utile
  if (possibles.talentDispo) {
    actions.push({ type: 'talent' })
  }

  // 3. Supporter quand il manque d'Énergie (moins de 3)
  if (possibles.supporterDispo && campBot.energie < 3) {
    actions.push({ type: 'supporter' })
  }

  // 4. Reculer si l'actif est presque KO et qu'un remplaçant en forme attend
  const actif = campBot.actif
  const presqueKo = actif.pv <= actif.pvMax * 0.25
  if (presqueKo && possibles.peutChanger) {
    let meilleurIndex = 0
    for (let index = 1; index < campBot.banc.length; index++) {
      if (campBot.banc[index].pv > campBot.banc[meilleurIndex].pv) {
        meilleurIndex = index
      }
    }
    if (campBot.banc[meilleurIndex].pv > actif.pv) {
      actions.push({ type: 'changement', indexBanc: meilleurIndex })
      return actions
    }
  }

  // 5. La plus grosse attaque payable (Objet juste avant, pour en profiter)
  const attaquesJouables = possibles.attaques.filter((element) => element.possible)
  if (attaquesJouables.length > 0) {
    let meilleure = attaquesJouables[0]
    for (const element of attaquesJouables) {
      if (degatsEstimes(etat, element.attaque) > degatsEstimes(etat, meilleure.attaque)) {
        meilleure = element
      }
    }
    if (possibles.objetDispo) {
      actions.push({ type: 'objet' })
    }
    actions.push({ type: 'attaque', index: meilleure.index })
    return actions
  }

  actions.push({ type: 'concentration' })
  return actions
}

export function choisirActionsDuBot(etat, niveau) {
  if (niveau === 'facile') {
    return choisirFacile(etat)
  }
  return choisirNormal(etat)
}
