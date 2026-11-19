// Moteur de combat : TOUTES les règles du combat, sans rien d'affichage.
// Chaque fonction reçoit l'état du combat et renvoie un NOUVEL état (on ne modifie jamais l'ancien).
// Règles : MODES_DE_JEU.md. Données des cartes : src/donnees/combat.js.
import { trouverCarte } from '../donnees/cartes'
import { fichesCombattants, fichesSupporters, fichesObjets, combos, numerosProdiges } from '../donnees/combat'

export const ENERGIE_MAX = 10
const ENERGIE_DEPART = 3
const ENERGIE_PAR_TOUR = 2
const ENERGIE_CONCENTRATION = 2
export const KO_POUR_GAGNER = 3

// Copie complète d'un objet (pour ne jamais modifier l'ancien état)
function copier(objet) {
  return JSON.parse(JSON.stringify(objet))
}

function adversaireDe(idCamp) {
  return idCamp === 'joueur' ? 'bot' : 'joueur'
}

// ---------- Création du combat ----------

function creerCombattant(numero) {
  const fiche = fichesCombattants[numero]
  return {
    numero,
    nom: trouverCarte(numero).nom,
    rarete: trouverCarte(numero).rarete,
    type: fiche.type,
    faiblesse: fiche.faiblesse,
    retraite: fiche.retraite,
    pvMax: fiche.pv,
    pv: fiche.pv,
    talentUtilise: false,
    bouclier: 0, // dégâts en moins pendant le prochain tour adverse
    bouclierPermanent: 0, // Paravoile
    annuleProchaineAttaque: false, // Talent de Daruk
    retraiteGratuite: false, // Paravoile
    bloque: false, // ne peut pas changer de place ce tour
    fatigue: false, // ne pourra pas attaquer à son prochain tour
    fatigueActive: false, // ne peut pas attaquer CE tour
  }
}

function creerCamp(nom, deck) {
  const combattants = deck.combattants.map(creerCombattant)
  return {
    nom,
    energie: ENERGIE_DEPART,
    ko: 0,
    actif: combattants[0],
    banc: combattants.slice(1),
    supporter: { numero: deck.supporter, utilise: false },
    objet: { numero: deck.objet, utilise: false },
    bonusProchaineAttaque: 0, // Master Sword
    talentAdverseDesactive: false, // Tablette Sheikah (posée par l'adversaire)
    retraiteGratuiteCeTour: false, // Talent de Revali
  }
}

// Crée un combat. Le premier joueur est tiré au hasard.
export function creerCombat(deckJoueur, deckBot, nomBot) {
  return {
    camps: {
      joueur: creerCamp('Toi', deckJoueur),
      bot: creerCamp(nomBot, deckBot),
    },
    tour: Math.random() < 0.5 ? 'joueur' : 'bot',
    numeroTour: 1,
    gagnant: null,
    remplacementEnAttente: null, // 'joueur' si le joueur doit choisir un nouveau combattant actif
    message: 'Le combat commence !',
    evenement: null, // dernière chose qui s'est passée (sert aux animations)
    compteurEvenements: 0,
  }
}

// ---------- Petites aides ----------

function ajouterEnergie(camp, quantite) {
  camp.energie = Math.max(0, Math.min(ENERGIE_MAX, camp.energie + quantite))
}

function combattantsEnVie(camp) {
  const liste = camp.banc.slice()
  if (camp.actif) {
    liste.unshift(camp.actif)
  }
  return liste
}

function noterEvenement(etat, evenement) {
  etat.compteurEvenements = etat.compteurEvenements + 1
  etat.evenement = { ...evenement, id: etat.compteurEvenements }
}

// Inflige des dégâts à UN combattant. Renvoie les dégâts réellement subis.
function blesser(combattant, degats, ignoreBouclier) {
  let degatsFinaux = degats
  if (!ignoreBouclier) {
    if (combattant.annuleProchaineAttaque) {
      combattant.annuleProchaineAttaque = false
      return 0
    }
    degatsFinaux = degatsFinaux - combattant.bouclier - combattant.bouclierPermanent
  }
  degatsFinaux = Math.max(0, degatsFinaux)
  combattant.pv = Math.max(0, combattant.pv - degatsFinaux)
  return degatsFinaux
}

// Retire les combattants KO (actif et banc) et compte les KO. Termine le combat si besoin.
function verifierKo(etat, idCamp) {
  const camp = etat.camps[idCamp]
  const bancEnVie = camp.banc.filter((combattant) => combattant.pv > 0)
  camp.ko = camp.ko + (camp.banc.length - bancEnVie.length)
  camp.banc = bancEnVie

  if (camp.actif && camp.actif.pv <= 0) {
    camp.ko = camp.ko + 1
    camp.actif = null
  }

  // Le gagnant est celui qui a mis KO 3 combattants adverses (ou qui a battu toute l'équipe)
  if (camp.ko >= KO_POUR_GAGNER || (camp.actif === null && camp.banc.length === 0)) {
    etat.gagnant = adversaireDe(idCamp)
    return
  }

  // Plus d'actif : il faut un remplaçant
  if (camp.actif === null) {
    if (idCamp === 'bot') {
      // Le bot prend le combattant de son banc qui a le plus de PV
      let meilleurIndex = 0
      for (let index = 1; index < camp.banc.length; index++) {
        if (camp.banc[index].pv > camp.banc[meilleurIndex].pv) {
          meilleurIndex = index
        }
      }
      camp.actif = camp.banc.splice(meilleurIndex, 1)[0]
    } else {
      etat.remplacementEnAttente = 'joueur'
    }
  }
}

// ---------- Ce qui est possible pour un camp ----------

// Liste des combos (Ultimes) réalisables par ce camp, avec "possible" = assez d'Énergie
export function ultimesDisponibles(etat, idCamp) {
  const camp = etat.camps[idCamp]
  if (!camp.actif) {
    return []
  }
  const numerosEnVie = combattantsEnVie(camp).map((combattant) => combattant.numero)
  const resultats = []
  for (const combo of combos) {
    if (!combo.disponible) {
      continue
    }
    const tousLesGroupesPresents = combo.groupes.every((groupe) =>
      groupe.some((numero) => numerosEnVie.includes(numero))
    )
    const actifDansLeCombo = combo.groupes.some((groupe) => groupe.includes(camp.actif.numero))
    const supporterOk = !combo.supporter || (camp.supporter.numero === combo.supporter && !camp.supporter.utilise)
    const objetOk = !combo.objet || (camp.objet.numero === combo.objet && !camp.objet.utilise)
    if (tousLesGroupesPresents && actifDansLeCombo && supporterOk && objetOk) {
      resultats.push({ combo, possible: camp.energie >= combo.cout })
    }
  }
  return resultats
}

// Tout ce que le camp peut faire maintenant (pour afficher les boutons et pour le bot)
export function actionsPossibles(etat, idCamp) {
  const camp = etat.camps[idCamp]
  const actif = camp.actif
  const aSonTour = etat.tour === idCamp && !etat.gagnant && !etat.remplacementEnAttente && actif !== null
  const fiche = actif ? fichesCombattants[actif.numero] : null
  const coutRetraite = actif && (actif.retraiteGratuite || camp.retraiteGratuiteCeTour) ? 0 : actif ? actif.retraite : 0

  return {
    aSonTour,
    attaques: fiche
      ? fiche.attaques.map((attaque, index) => ({
          index,
          attaque,
          possible: aSonTour && !actif.fatigueActive && camp.energie >= attaque.cout,
        }))
      : [],
    peutSeConcentrer: aSonTour,
    coutRetraite,
    peutChanger: aSonTour && !actif.bloque && camp.banc.length > 0 && camp.energie >= coutRetraite,
    supporterDispo: aSonTour && !camp.supporter.utilise,
    objetDispo: aSonTour && !camp.objet.utilise,
    talent: fiche && fiche.talent ? fiche.talent : null,
    talentDispo:
      aSonTour && fiche !== null && !!fiche.talent && !actif.talentUtilise && !camp.talentAdverseDesactive,
    ultimes: aSonTour ? ultimesDisponibles(etat, idCamp) : [],
  }
}

// ---------- Passage au tour suivant ----------

function passerAuTourSuivant(etat) {
  const campQuiFinit = etat.camps[etat.tour]
  for (const combattant of combattantsEnVie(campQuiFinit)) {
    combattant.bloque = false
    combattant.fatigueActive = false
  }
  campQuiFinit.retraiteGratuiteCeTour = false

  etat.tour = adversaireDe(etat.tour)
  etat.numeroTour = etat.numeroTour + 1

  // Début du tour du nouveau camp : +2 Énergie, ses Boucliers temporaires expirent
  const campQuiCommence = etat.camps[etat.tour]
  ajouterEnergie(campQuiCommence, ENERGIE_PAR_TOUR)
  for (const combattant of combattantsEnVie(campQuiCommence)) {
    combattant.bouclier = 0
    if (combattant.fatigue) {
      combattant.fatigue = false
      combattant.fatigueActive = true
    }
  }
}

// ---------- Les actions ----------

// Calcule et inflige les dégâts d'une attaque (ou d'un Ultime). Renvoie les dégâts sur l'actif.
function frapper(etat, idCamp, degatsDeBase, effets, nomAttaque) {
  const camp = etat.camps[idCamp]
  const adversaire = etat.camps[adversaireDe(idCamp)]
  const attaquant = camp.actif
  const cible = adversaire.actif

  let degats = degatsDeBase + camp.bonusProchaineAttaque
  camp.bonusProchaineAttaque = 0

  if (effets.bonusParProdige) {
    const prodigesAuBanc = camp.banc.filter((combattant) => numerosProdiges.includes(combattant.numero)).length
    degats = degats + effets.bonusParProdige * prodigesAuBanc
  }
  if (effets.critique && adversaire.energie >= effets.critique.energieMin) {
    degats = degats + effets.critique.bonus
  }

  // Faiblesse : dégâts x2
  const faiblesse = cible.faiblesse === attaquant.type
  if (faiblesse) {
    degats = degats * 2
  }

  const degatsSurActif = blesser(cible, degats, effets.ignoreBouclier)
  let degatsDeZone = 0
  if (effets.zone) {
    for (const combattant of adversaire.banc) {
      degatsDeZone = degatsDeZone + blesser(combattant, effets.zone, effets.ignoreBouclier)
    }
  }

  // Celui qui prend des dégâts gagne +1 Énergie (aide à revenir dans le combat)
  if (degatsSurActif + degatsDeZone > 0) {
    ajouterEnergie(adversaire, 1)
  }

  // Effets sur l'attaquant et sur l'adversaire
  if (effets.bouclier) {
    attaquant.bouclier = effets.bouclier
  }
  if (effets.recul) {
    attaquant.pv = Math.max(0, attaquant.pv - effets.recul)
  }
  if (effets.bloque && cible.pv > 0) {
    cible.bloque = true
  }
  if (effets.energieAdverse) {
    ajouterEnergie(adversaire, -effets.energieAdverse)
  }
  if (effets.fatigue) {
    attaquant.fatigue = true
  }
  if (effets.soinBanc && camp.banc.length > 0) {
    soignerLePlusBlesse(camp.banc, effets.soinBanc)
  }
  if (effets.soinActif) {
    attaquant.pv = Math.min(attaquant.pvMax, attaquant.pv + effets.soinActif)
  }

  etat.message =
    attaquant.nom + ' utilise ' + nomAttaque + ' : ' + degatsSurActif + ' dégâts' +
    (faiblesse ? ' (faiblesse !)' : '') +
    (degatsDeZone > 0 ? ' + zone sur le banc' : '')

  // On garde une "photo" des cartes KO AVANT de les retirer : l'écran s'en sert pour l'animation de KO
  noterEvenement(etat, {
    type: 'attaque',
    attaquant: idCamp,
    typeAttaquant: attaquant.type,
    degats: degatsSurActif,
    zone: effets.zone && degatsDeZone > 0,
    faiblesse,
    koActif: cible.pv <= 0 ? copier(cible) : null,
    koBanc: adversaire.banc.filter((combattant) => combattant.pv <= 0).map((combattant) => combattant.numero),
  })

  // KO ? (l'adversaire d'abord, puis l'attaquant à cause du recul)
  verifierKo(etat, adversaireDe(idCamp))
  if (!etat.gagnant) {
    verifierKo(etat, idCamp)
  }
  return degatsSurActif
}

function soignerLePlusBlesse(combattants, soin) {
  let plusBlesse = null
  for (const combattant of combattants) {
    const blessure = combattant.pvMax - combattant.pv
    if (blessure > 0 && (plusBlesse === null || blessure > plusBlesse.pvMax - plusBlesse.pv)) {
      plusBlesse = combattant
    }
  }
  if (plusBlesse) {
    plusBlesse.pv = Math.min(plusBlesse.pvMax, plusBlesse.pv + soin)
  }
}

function attaquer(etat, idCamp, indexAttaque) {
  const camp = etat.camps[idCamp]
  const attaque = fichesCombattants[camp.actif.numero].attaques[indexAttaque]
  ajouterEnergie(camp, -attaque.cout)
  frapper(etat, idCamp, attaque.degats, attaque.effets ?? {}, attaque.nom)
}

function lancerUltime(etat, idCamp, idCombo) {
  const camp = etat.camps[idCamp]
  const combo = combos.find((element) => element.id === idCombo)
  ajouterEnergie(camp, -combo.cout)
  // Le Supporter / l'Objet du combo est consommé
  if (combo.supporter) {
    camp.supporter.utilise = true
  }
  if (combo.objet) {
    camp.objet.utilise = true
  }
  frapper(etat, idCamp, combo.degats, { zone: combo.zone }, combo.ultime)
  if (etat.evenement) {
    etat.evenement.ultime = combo.id
  }
}

function seConcentrer(etat, idCamp) {
  ajouterEnergie(etat.camps[idCamp], ENERGIE_CONCENTRATION)
  etat.message = etat.camps[idCamp].actif.nom + ' se concentre : +' + ENERGIE_CONCENTRATION + ' Énergie'
  noterEvenement(etat, { type: 'concentration', camp: idCamp })
}

function changerDeCombattant(etat, idCamp, indexBanc) {
  const camp = etat.camps[idCamp]
  const cout = actionsPossibles(etat, idCamp).coutRetraite
  ajouterEnergie(camp, -cout)
  const ancienActif = camp.actif
  camp.actif = camp.banc[indexBanc]
  camp.banc[indexBanc] = ancienActif
  etat.message = ancienActif.nom + ' recule, ' + camp.actif.nom + ' entre en jeu'
  noterEvenement(etat, { type: 'changement', camp: idCamp })
}

function jouerSupporter(etat, idCamp) {
  const camp = etat.camps[idCamp]
  const adversaire = etat.camps[adversaireDe(idCamp)]
  const effet = fichesSupporters[camp.supporter.numero].effet
  camp.supporter.utilise = true

  if (effet === 'zelda') {
    camp.actif.pv = Math.min(camp.actif.pvMax, camp.actif.pv + 40)
    ajouterEnergie(camp, 1)
  } else if (effet === 'roi') {
    const adversaireARare = combattantsEnVie(adversaire).some((combattant) => combattant.rarete >= 3)
    ajouterEnergie(camp, adversaireARare ? 5 : 3)
  } else if (effet === 'terry') {
    ajouterEnergie(camp, 2)
  } else if (effet === 'pruha') {
    camp.objet.utilise = false
  } else if (effet === 'impa') {
    // Ton actif part au banc, remplacé par ton combattant le plus en forme
    if (camp.banc.length > 0) {
      let meilleurIndex = 0
      for (let index = 1; index < camp.banc.length; index++) {
        if (camp.banc[index].pv > camp.banc[meilleurIndex].pv) {
          meilleurIndex = index
        }
      }
      const ancienActif = camp.actif
      camp.actif = camp.banc[meilleurIndex]
      camp.banc[meilleurIndex] = ancienActif
    }
    // La carte la plus faible du banc adverse est exposée (devient son actif)
    if (adversaire.banc.length > 0) {
      let plusFaibleIndex = 0
      for (let index = 1; index < adversaire.banc.length; index++) {
        if (adversaire.banc[index].pv < adversaire.banc[plusFaibleIndex].pv) {
          plusFaibleIndex = index
        }
      }
      const ancienActifAdverse = adversaire.actif
      adversaire.actif = adversaire.banc[plusFaibleIndex]
      adversaire.banc[plusFaibleIndex] = ancienActifAdverse
    }
  }
  etat.message = camp.nom + ' joue ' + trouverCarte(camp.supporter.numero).nom
  noterEvenement(etat, { type: 'supporter', camp: idCamp, numero: camp.supporter.numero })
}

function jouerObjet(etat, idCamp) {
  const camp = etat.camps[idCamp]
  const adversaire = etat.camps[adversaireDe(idCamp)]
  const effet = fichesObjets[camp.objet.numero].effet
  camp.objet.utilise = true

  if (effet === 'masterSword') {
    const estLink = camp.actif.numero === 1 || camp.actif.numero === 23
    camp.bonusProchaineAttaque = estLink ? 110 : 60
  } else if (effet === 'paravoile') {
    camp.actif.retraiteGratuite = true
    camp.actif.bouclierPermanent = 20
  } else if (effet === 'tablette') {
    ajouterEnergie(camp, 1)
    adversaire.talentAdverseDesactive = true
  }
  etat.message = camp.nom + ' utilise ' + trouverCarte(camp.objet.numero).nom
  noterEvenement(etat, { type: 'objet', camp: idCamp, numero: camp.objet.numero })
}

function utiliserTalent(etat, idCamp) {
  const camp = etat.camps[idCamp]
  const talent = fichesCombattants[camp.actif.numero].talent
  camp.actif.talentUtilise = true

  if (talent.id === 'priere') {
    soignerLePlusBlesse(combattantsEnVie(camp), 50)
  } else if (talent.id === 'bouclierDaruk') {
    camp.actif.annuleProchaineAttaque = true
  } else if (talent.id === 'rageRevali') {
    camp.retraiteGratuiteCeTour = true
  }
  etat.message = camp.actif.nom + ' active ' + talent.nom
  noterEvenement(etat, { type: 'talent', camp: idCamp })
}

// Le joueur choisit son nouveau combattant actif après un KO
function remplacer(etat, idCamp, indexBanc) {
  const camp = etat.camps[idCamp]
  camp.actif = camp.banc.splice(indexBanc, 1)[0]
  etat.remplacementEnAttente = null
  etat.message = camp.actif.nom + ' entre en jeu'
}

// ---------- Point d'entrée unique ----------
// action : { type: 'attaque', index } | { type: 'concentration' } | { type: 'changement', indexBanc }
//        | { type: 'supporter' } | { type: 'objet' } | { type: 'talent' } | { type: 'ultime', idCombo }
//        | { type: 'remplacement', indexBanc }
// Les actions "gratuites" (supporter, objet, talent) ne terminent PAS le tour.
export function jouerAction(etatActuel, idCamp, action) {
  const etat = copier(etatActuel)

  if (action.type === 'remplacement') {
    remplacer(etat, idCamp, action.indexBanc)
    return etat
  }
  if (action.type === 'supporter') {
    jouerSupporter(etat, idCamp)
    return etat
  }
  if (action.type === 'objet') {
    jouerObjet(etat, idCamp)
    return etat
  }
  if (action.type === 'talent') {
    utiliserTalent(etat, idCamp)
    return etat
  }

  if (action.type === 'attaque') {
    attaquer(etat, idCamp, action.index)
  } else if (action.type === 'ultime') {
    lancerUltime(etat, idCamp, action.idCombo)
  } else if (action.type === 'concentration') {
    seConcentrer(etat, idCamp)
  } else if (action.type === 'changement') {
    changerDeCombattant(etat, idCamp, action.indexBanc)
  }

  // Action principale jouée : on passe au tour suivant (sauf si le combat est fini)
  if (!etat.gagnant) {
    passerAuTourSuivant(etat)
  }
  return etat
}
