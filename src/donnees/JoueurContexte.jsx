// Données du joueur partagées par tous les écrans (Éclats, Tickets, cartes, deck, statistiques, profil…).
// Elles sont SAUVEGARDÉES sur l'appareil (AsyncStorage : stockage du téléphone, ou du navigateur sur le web).
// Pas encore de compte en ligne : chaque appareil a sa propre partie.
import { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { cartesZelda } from './cartes'
import { categorieCarte, niveauxBot, RECOMPENSE_DEFAITE } from './combat'
import { VALEUR_RECYCLAGE, paliersCollection, cartesRequises } from './collection'

// Nom sous lequel la partie est rangée dans le stockage
const CLE_SAUVEGARDE = 'ultimate-pocket:joueur'

const UNE_HEURE = 60 * 60 * 1000
export const DUREE_RECHARGE_BOOSTER = 12 * UNE_HEURE // provisoire : 12 h
const GAIN_PAR_TICKET = UNE_HEURE // provisoire : 1 Ticket = -1 h
export const PUBS_TICKETS_PAR_JOUR = 5 // provisoire : 5 pubs "Ticket" par jour maximum
export const LONGUEUR_MAX_PSEUDO = 16

// Date du jour sous la forme "2026-11-19" (sert à remettre les compteurs à zéro chaque jour)
function dateDuJour() {
  return new Date().toISOString().slice(0, 10)
}

// La partie d'un nouveau joueur. Sert au premier lancement, à compléter une vieille sauvegarde,
// et au bouton "Recommencer la partie" du Profil.
function partieDeDepart() {
  return {
    pseudo: 'Elyes',
    avatar: null, // numéro de la carte choisie comme avatar (null = initiale du pseudo)
    eclats: 1250,
    tickets: 3,
    boosterPretA: Date.now() + 3 * UNE_HEURE + 12 * 60 * 1000, // booster quotidien prêt dans 3 h 12
    // Nombre d'exemplaires de chaque carte possédée, ex. { 1: 1, 9: 3 } (3 = la carte + 2 doublons)
    exemplaires: Object.fromEntries(cartesZelda.filter((carte) => carte.possedee).map((carte) => [carte.numero, 1])),
    paliersReclames: [], // paliers de collection déjà réclamés, ex. ['p25']
    pubsParBooster: {}, // ex. { 'zelda-botw': 2 }
    pubsTicketsDuJour: { jour: dateDuJour(), nombre: 0 },
    deck: null, // { combattants: [5 numéros], supporter, objet } ; null = deck automatique
    statistiques: {
      victoires: 0,
      defaites: 0,
      niveauxBattus: [],
      jourDerniereVictoire: null,
      cartesJouees: {}, // nombre de combats joués par carte, ex. { 9: 4 }
    },
    parametres: { son: true, vibrations: true },
  }
}

const JoueurContexte = createContext(null)

export function JoueurFournisseur({ children }) {
  const depart = partieDeDepart()
  const [pseudo, setPseudo] = useState(depart.pseudo)
  const [avatar, setAvatar] = useState(depart.avatar)
  const [eclats, setEclats] = useState(depart.eclats)
  const [tickets, setTickets] = useState(depart.tickets)
  const [boosterPretA, setBoosterPretA] = useState(depart.boosterPretA)
  const [exemplaires, setExemplaires] = useState(depart.exemplaires)
  const [paliersReclames, setPaliersReclames] = useState(depart.paliersReclames)
  const [pubsParBooster, setPubsParBooster] = useState(depart.pubsParBooster)
  const [pubsTicketsDuJour, setPubsTicketsDuJour] = useState(depart.pubsTicketsDuJour)
  const [deck, setDeck] = useState(depart.deck)
  const [statistiques, setStatistiques] = useState(depart.statistiques)
  const [parametres, setParametres] = useState(depart.parametres)
  // Passe à true quand la sauvegarde a été lue (ou qu'il n'y en avait pas)
  const [donneesChargees, setDonneesChargees] = useState(false)

  // Remplace toutes les données par celles d'une partie (sauvegardée ou de départ)
  function appliquerPartie(partie) {
    // On complète avec la partie de départ : une vieille sauvegarde n'a pas forcément tous les champs
    const complete = { ...partieDeDepart(), ...partie }
    complete.statistiques = { ...partieDeDepart().statistiques, ...partie.statistiques }
    // Vieille sauvegarde (avant les doublons) : une liste "cartesPossedees" → 1 exemplaire de chaque
    if (!partie.exemplaires && partie.cartesPossedees) {
      complete.exemplaires = Object.fromEntries(partie.cartesPossedees.map((numero) => [numero, 1]))
    }
    setPseudo(complete.pseudo)
    setAvatar(complete.avatar)
    setEclats(complete.eclats)
    setTickets(complete.tickets)
    setBoosterPretA(complete.boosterPretA)
    setExemplaires(complete.exemplaires)
    setPaliersReclames(complete.paliersReclames)
    setPubsParBooster(complete.pubsParBooster)
    setPubsTicketsDuJour(complete.pubsTicketsDuJour)
    setDeck(complete.deck)
    setStatistiques(complete.statistiques)
    setParametres(complete.parametres)
  }

  // 1. Au démarrage : on relit la partie sauvegardée, si elle existe
  useEffect(() => {
    async function chargerPartie() {
      try {
        const texteSauvegarde = await AsyncStorage.getItem(CLE_SAUVEGARDE)
        if (texteSauvegarde !== null) {
          appliquerPartie(JSON.parse(texteSauvegarde))
        }
      } catch (erreur) {
        // Sauvegarde illisible : on garde la partie de départ plutôt que de bloquer le jeu
        console.warn('Impossible de lire la sauvegarde', erreur)
      }
      setDonneesChargees(true)
    }
    chargerPartie()
  }, [])

  // 2. À chaque changement : on sauvegarde la partie.
  // On attend d'avoir chargé, sinon on écraserait la sauvegarde avec les valeurs de départ.
  const partie = {
    pseudo, avatar, eclats, tickets, boosterPretA, exemplaires, paliersReclames,
    pubsParBooster, pubsTicketsDuJour, deck, statistiques, parametres,
  }
  useEffect(() => {
    if (!donneesChargees) {
      return
    }
    AsyncStorage.setItem(CLE_SAUVEGARDE, JSON.stringify(partie)).catch((erreur) =>
      console.warn('Impossible de sauvegarder la partie', erreur)
    )
  }, [donneesChargees, ...Object.values(partie)])

  // ---------- Booster quotidien et Tickets ----------

  // Dépense un Ticket pour avancer le minuteur d'une heure
  function utiliserTicket() {
    if (tickets <= 0) {
      return
    }
    setTickets(tickets - 1)
    setBoosterPretA(boosterPretA - GAIN_PAR_TICKET)
  }

  // Le booster quotidien vient d'être ouvert : le minuteur repart pour 12 h
  function relancerBoosterQuotidien() {
    setBoosterPretA(Date.now() + DUREE_RECHARGE_BOOSTER)
  }

  // ---------- Boutique ----------

  // Retire des Éclats. Renvoie false si le joueur n'en a pas assez.
  function depenserEclats(montant) {
    if (eclats < montant) {
      return false
    }
    setEclats(eclats - montant)
    return true
  }

  // Nombre de pubs "Ticket" encore possibles aujourd'hui
  function pubsTicketsRestantes() {
    const nombreAujourdhui = pubsTicketsDuJour.jour === dateDuJour() ? pubsTicketsDuJour.nombre : 0
    return PUBS_TICKETS_PAR_JOUR - nombreAujourdhui
  }

  // Le joueur a regardé une pub "Ticket" : +1 Ticket (dans la limite du jour)
  function recompenserPubTicket() {
    if (pubsTicketsRestantes() <= 0) {
      return
    }
    setTickets(tickets + 1)
    setPubsTicketsDuJour({ jour: dateDuJour(), nombre: PUBS_TICKETS_PAR_JOUR - pubsTicketsRestantes() + 1 })
  }

  // Le joueur a regardé une pub pour un booster : on compte +1 pour ce booster
  function compterPubBooster(idBooster) {
    const dejaRegardees = pubsParBooster[idBooster] ?? 0
    setPubsParBooster({ ...pubsParBooster, [idBooster]: dejaRegardees + 1 })
  }

  // Le booster payé en pubs vient d'être ouvert : son compteur repart à zéro
  function remettreAZeroPubsBooster(idBooster) {
    setPubsParBooster({ ...pubsParBooster, [idBooster]: 0 })
  }

  // ---------- Collection ----------

  // Numéros des cartes possédées (au moins 1 exemplaire), dans l'ordre de la collection
  const cartesPossedees = cartesZelda
    .filter((carte) => (exemplaires[carte.numero] ?? 0) > 0)
    .map((carte) => carte.numero)

  function possedeCarte(numero) {
    return (exemplaires[numero] ?? 0) > 0
  }

  function nombreExemplaires(numero) {
    return exemplaires[numero] ?? 0
  }

  // Ajoute les cartes d'un booster : +1 exemplaire par carte tirée (les doublons sont comptés)
  function ajouterCartes(numeros) {
    setExemplaires((anciens) => {
      const nouveaux = { ...anciens }
      for (const numero of numeros) {
        nouveaux[numero] = (nouveaux[numero] ?? 0) + 1
      }
      return nouveaux
    })
  }

  // Éclats que rapporteraient tous les doublons d'une carte (ou de toute la collection si numero est absent)
  function valeurDoublons(numero) {
    const numeros = numero === undefined ? cartesPossedees : [numero]
    let total = 0
    for (const element of numeros) {
      const doublons = Math.max(0, (exemplaires[element] ?? 0) - 1)
      total = total + doublons * VALEUR_RECYCLAGE[cartesZelda.find((carte) => carte.numero === element).rarete]
    }
    return total
  }

  // Recycle les doublons contre des Éclats (on garde toujours 1 exemplaire).
  // Avec un numéro : seulement 1 doublon de cette carte. Sans numéro : tous les doublons.
  // Renvoie le nombre d'Éclats gagnés.
  function recyclerDoublons(numero) {
    const nouveaux = { ...exemplaires }
    let gain = 0
    const numeros = numero === undefined ? cartesPossedees : [numero]
    for (const element of numeros) {
      const doublons = Math.max(0, (nouveaux[element] ?? 0) - 1)
      const aRecycler = numero === undefined ? doublons : Math.min(1, doublons)
      if (aRecycler > 0) {
        nouveaux[element] = nouveaux[element] - aRecycler
        gain = gain + aRecycler * VALEUR_RECYCLAGE[cartesZelda.find((carte) => carte.numero === element).rarete]
      }
    }
    if (gain > 0) {
      setExemplaires(nouveaux)
      setEclats(eclats + gain)
    }
    return gain
  }

  // État d'un palier : 'reclame', 'pret' (à réclamer) ou 'verrouille'
  function etatPalier(palier) {
    if (paliersReclames.includes(palier.id)) {
      return 'reclame'
    }
    return cartesPossedees.length >= cartesRequises(palier, cartesZelda.length) ? 'pret' : 'verrouille'
  }

  // Donne la récompense d'un palier atteint. Renvoie le palier, ou null s'il n'est pas prêt.
  function reclamerPalier(idPalier) {
    const palier = paliersCollection.find((element) => element.id === idPalier)
    if (!palier || etatPalier(palier) !== 'pret') {
      return null
    }
    setEclats(eclats + palier.eclats)
    setTickets(tickets + palier.tickets)
    setPaliersReclames([...paliersReclames, palier.id])
    return palier
  }

  // Titre affiché sous le pseudo (débloqué par le palier 100 %), ou null
  const titre = paliersCollection.find((palier) => palier.titre && paliersReclames.includes(palier.id))?.titre ?? null

  // ---------- Combat ----------

  // Deck utilisé en combat : celui choisi par le joueur, sinon un deck automatique
  // avec ses meilleures cartes possédées (null s'il n'a pas assez de cartes)
  function deckDeCombat() {
    if (deck) {
      return deck
    }
    const possedees = cartesZelda.filter((carte) => cartesPossedees.includes(carte.numero))
    const parRarete = possedees.slice().sort((a, b) => b.rarete - a.rarete)
    const combattants = parRarete.filter((carte) => categorieCarte(carte.numero) === 'combattant').slice(0, 5)
    const supporter = parRarete.find((carte) => categorieCarte(carte.numero) === 'supporter')
    const objet = parRarete.find((carte) => categorieCarte(carte.numero) === 'objet')
    if (combattants.length < 5 || !supporter || !objet) {
      return null
    }
    return { combattants: combattants.map((carte) => carte.numero), supporter: supporter.numero, objet: objet.numero }
  }

  // Fin d'un combat contre un bot : donne la récompense et met à jour les statistiques.
  // "numerosJoues" = les cartes du deck utilisé (pour trouver la carte favorite).
  // Renvoie ce qui a été gagné : { eclats, ticket }
  function recompenserCombat(victoire, idNiveau, numerosJoues) {
    const cartesJouees = { ...statistiques.cartesJouees }
    for (const numero of numerosJoues) {
      cartesJouees[numero] = (cartesJouees[numero] ?? 0) + 1
    }

    if (!victoire) {
      setEclats(eclats + RECOMPENSE_DEFAITE)
      setStatistiques({ ...statistiques, defaites: statistiques.defaites + 1, cartesJouees })
      return { eclats: RECOMPENSE_DEFAITE, ticket: false }
    }
    const niveau = niveauxBot.find((element) => element.id === idNiveau)
    const premiereVictoireDuJour = statistiques.jourDerniereVictoire !== dateDuJour()
    setEclats(eclats + niveau.recompense)
    if (premiereVictoireDuJour) {
      setTickets(tickets + 1)
    }
    const niveauxBattus = statistiques.niveauxBattus.includes(idNiveau)
      ? statistiques.niveauxBattus
      : [...statistiques.niveauxBattus, idNiveau]
    setStatistiques({
      ...statistiques,
      victoires: statistiques.victoires + 1,
      niveauxBattus,
      jourDerniereVictoire: dateDuJour(),
      cartesJouees,
    })
    return { eclats: niveau.recompense, ticket: premiereVictoireDuJour }
  }

  // ---------- Profil ----------

  // Change le pseudo (espaces retirés, longueur limitée, jamais vide)
  function changerPseudo(nouveauPseudo) {
    const propre = nouveauPseudo.trim().slice(0, LONGUEUR_MAX_PSEUDO)
    if (propre.length > 0) {
      setPseudo(propre)
    }
  }

  function changerParametre(nom, valeur) {
    setParametres({ ...parametres, [nom]: valeur })
  }

  // Efface tout et repart d'une partie neuve
  function recommencerPartie() {
    appliquerPartie(partieDeDepart())
  }

  const valeur = {
    donneesChargees,
    pseudo,
    avatar,
    eclats,
    tickets,
    boosterPretA,
    cartesPossedees,
    utiliserTicket,
    relancerBoosterQuotidien,
    depenserEclats,
    possedeCarte,
    nombreExemplaires,
    ajouterCartes,
    valeurDoublons,
    recyclerDoublons,
    etatPalier,
    reclamerPalier,
    titre,
    pubsParBooster,
    pubsTicketsRestantes,
    recompenserPubTicket,
    compterPubBooster,
    remettreAZeroPubsBooster,
    deck,
    setDeck,
    deckDeCombat,
    statistiques,
    recompenserCombat,
    parametres,
    changerPseudo,
    setAvatar,
    changerParametre,
    recommencerPartie,
  }

  return <JoueurContexte.Provider value={valeur}>{children}</JoueurContexte.Provider>
}

// À utiliser dans un écran : const { eclats } = useJoueur()
export function useJoueur() {
  return useContext(JoueurContexte)
}
