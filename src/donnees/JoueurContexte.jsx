// Données du joueur partagées par tous les écrans (Éclats, Tickets, booster quotidien, cartes possédées).
// Elles sont SAUVEGARDÉES sur l'appareil (AsyncStorage : stockage du téléphone, ou du navigateur sur le web).
// Pas encore de compte en ligne : chaque appareil a sa propre partie.
import { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { cartesZelda } from './cartes'
import { categorieCarte, niveauxBot, RECOMPENSE_DEFAITE } from './combat'

// Nom sous lequel la partie est rangée dans le stockage
const CLE_SAUVEGARDE = 'ultimate-pocket:joueur'

const UNE_HEURE = 60 * 60 * 1000
export const DUREE_RECHARGE_BOOSTER = 12 * UNE_HEURE // provisoire : 12 h
const GAIN_PAR_TICKET = UNE_HEURE // provisoire : 1 Ticket = -1 h
export const PUBS_TICKETS_PAR_JOUR = 5 // provisoire : 5 pubs "Ticket" par jour maximum

// Date du jour sous la forme "2026-11-19" (sert à remettre le compteur de pubs à zéro chaque jour)
function dateDuJour() {
  return new Date().toISOString().slice(0, 10)
}

// Numéros des cartes possédées au départ (champ "possedee" de cartes.js)
const cartesDeDepart = cartesZelda.filter((carte) => carte.possedee).map((carte) => carte.numero)

const JoueurContexte = createContext(null)

export function JoueurFournisseur({ children }) {
  const [pseudo] = useState('Elyes')
  const [eclats, setEclats] = useState(1250)
  const [tickets, setTickets] = useState(3)
  // Moment où le booster quotidien sera prêt (ici : dans 3 h 12 min)
  const [boosterPretA, setBoosterPretA] = useState(Date.now() + 3 * UNE_HEURE + 12 * 60 * 1000)
  const [cartesPossedees, setCartesPossedees] = useState(cartesDeDepart)
  // Pubs déjà regardées pour chaque booster, ex. { 'zelda-botw': 2 }
  const [pubsParBooster, setPubsParBooster] = useState({})
  // Pubs "Ticket" regardées aujourd'hui, ex. { jour: '2026-11-19', nombre: 3 }
  const [pubsTicketsDuJour, setPubsTicketsDuJour] = useState({ jour: dateDuJour(), nombre: 0 })
  // Deck de combat choisi par le joueur : { combattants: [5 numéros], supporter, objet } (null = deck automatique)
  const [deck, setDeck] = useState(null)
  // Statistiques de combat (serviront aussi au Profil)
  const [statistiques, setStatistiques] = useState({ victoires: 0, defaites: 0, niveauxBattus: [], jourDerniereVictoire: null })
  // Passe à true quand la sauvegarde a été lue (ou qu'il n'y en avait pas)
  const [donneesChargees, setDonneesChargees] = useState(false)

  // 1. Au démarrage : on relit la partie sauvegardée, si elle existe
  useEffect(() => {
    async function chargerPartie() {
      try {
        const texteSauvegarde = await AsyncStorage.getItem(CLE_SAUVEGARDE)
        if (texteSauvegarde !== null) {
          const partie = JSON.parse(texteSauvegarde)
          setEclats(partie.eclats)
          setTickets(partie.tickets)
          setBoosterPretA(partie.boosterPretA)
          setCartesPossedees(partie.cartesPossedees)
          // "??" : valeur par défaut si la sauvegarde date d'une ancienne version du jeu
          setPubsParBooster(partie.pubsParBooster ?? {})
          setPubsTicketsDuJour(partie.pubsTicketsDuJour ?? { jour: dateDuJour(), nombre: 0 })
          setDeck(partie.deck ?? null)
          setStatistiques(partie.statistiques ?? { victoires: 0, defaites: 0, niveauxBattus: [], jourDerniereVictoire: null })
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
  useEffect(() => {
    if (!donneesChargees) {
      return
    }
    const partie = { eclats, tickets, boosterPretA, cartesPossedees, pubsParBooster, pubsTicketsDuJour, deck, statistiques }
    AsyncStorage.setItem(CLE_SAUVEGARDE, JSON.stringify(partie)).catch((erreur) =>
      console.warn('Impossible de sauvegarder la partie', erreur)
    )
  }, [donneesChargees, eclats, tickets, boosterPretA, cartesPossedees, pubsParBooster, pubsTicketsDuJour, deck, statistiques])

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
  // Renvoie ce qui a été gagné : { eclats, ticket }
  function recompenserCombat(victoire, idNiveau) {
    if (!victoire) {
      setEclats(eclats + RECOMPENSE_DEFAITE)
      setStatistiques({ ...statistiques, defaites: statistiques.defaites + 1 })
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
    })
    return { eclats: niveau.recompense, ticket: premiereVictoireDuJour }
  }

  function possedeCarte(numero) {
    return cartesPossedees.includes(numero)
  }

  // Ajoute à la collection les cartes qu'on n'avait pas encore
  function ajouterCartes(numeros) {
    setCartesPossedees((anciennes) => {
      const nouvelles = numeros.filter((numero) => !anciennes.includes(numero))
      return [...anciennes, ...nouvelles]
    })
  }

  const valeur = {
    donneesChargees,
    pseudo,
    eclats,
    tickets,
    boosterPretA,
    cartesPossedees,
    utiliserTicket,
    relancerBoosterQuotidien,
    depenserEclats,
    possedeCarte,
    ajouterCartes,
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
  }

  return <JoueurContexte.Provider value={valeur}>{children}</JoueurContexte.Provider>
}

// À utiliser dans un écran : const { eclats } = useJoueur()
export function useJoueur() {
  return useContext(JoueurContexte)
}
