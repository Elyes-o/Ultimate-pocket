// Données du joueur partagées par tous les écrans (Éclats, Tickets, booster quotidien, cartes possédées).
// Elles sont SAUVEGARDÉES sur l'appareil (AsyncStorage : stockage du téléphone, ou du navigateur sur le web).
// Pas encore de compte en ligne : chaque appareil a sa propre partie.
import { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { cartesZelda } from './cartes'

// Nom sous lequel la partie est rangée dans le stockage
const CLE_SAUVEGARDE = 'ultimate-pocket:joueur'

const UNE_HEURE = 60 * 60 * 1000
export const DUREE_RECHARGE_BOOSTER = 12 * UNE_HEURE // provisoire : 12 h
const GAIN_PAR_TICKET = UNE_HEURE // provisoire : 1 Ticket = -1 h

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
    const partie = { eclats, tickets, boosterPretA, cartesPossedees }
    AsyncStorage.setItem(CLE_SAUVEGARDE, JSON.stringify(partie)).catch((erreur) =>
      console.warn('Impossible de sauvegarder la partie', erreur)
    )
  }, [donneesChargees, eclats, tickets, boosterPretA, cartesPossedees])

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
  }

  return <JoueurContexte.Provider value={valeur}>{children}</JoueurContexte.Provider>
}

// À utiliser dans un écran : const { eclats } = useJoueur()
export function useJoueur() {
  return useContext(JoueurContexte)
}
