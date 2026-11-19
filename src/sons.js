// Bruitages et vibrations du jeu.
// Les sons sont dans assets/sons/ (créés par synthèse : sons originaux, sans droits d'auteur).
// Ils respectent les réglages "Son" et "Vibrations" du Profil.
//
// Utilisation dans un écran :
//   const { jouerSon, vibrer } = useEffetsSonores()
//   jouerSon('impact')   vibrer('fort')
import { Platform } from 'react-native'
import { createAudioPlayer } from 'expo-audio'
import * as Haptics from 'expo-haptics'
import { useJoueur } from './donnees/JoueurContexte'

const fichiersSons = {
  clic: require('../assets/sons/clic.wav'),
  carte: require('../assets/sons/carte.wav'),
  impact: require('../assets/sons/impact.wav'),
  ko: require('../assets/sons/ko.wav'),
  energie: require('../assets/sons/energie.wav'),
  ultime: require('../assets/sons/ultime.wav'),
  dechirure: require('../assets/sons/dechirure.wav'),
  rare: require('../assets/sons/rare.wav'),
  victoire: require('../assets/sons/victoire.wav'),
  defaite: require('../assets/sons/defaite.wav'),
  recompense: require('../assets/sons/recompense.wav'),
  ticket: require('../assets/sons/ticket.wav'),
}

// Un lecteur par son, créé la première fois qu'on en a besoin puis réutilisé
const lecteurs = {}

function lecteurDe(nom) {
  if (!lecteurs[nom]) {
    lecteurs[nom] = createAudioPlayer(fichiersSons[nom])
  }
  return lecteurs[nom]
}

function lireSon(nom) {
  try {
    const lecteur = lecteurDe(nom)
    lecteur.seekTo(0) // on repart du début si le son était déjà en train de jouer
    lecteur.play()
  } catch (erreur) {
    // Un son qui ne marche pas ne doit jamais bloquer le jeu
    console.warn('Son impossible à jouer : ' + nom, erreur)
  }
}

// Petite vibration du téléphone : 'leger', 'moyen', 'fort', 'succes' ou 'echec'
function faireVibrer(force) {
  if (Platform.OS === 'web') {
    return // pas de vibrations sur ordinateur
  }
  try {
    if (force === 'succes') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    } else if (force === 'echec') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error)
    } else {
      const styles = {
        leger: Haptics.ImpactFeedbackStyle.Light,
        moyen: Haptics.ImpactFeedbackStyle.Medium,
        fort: Haptics.ImpactFeedbackStyle.Heavy,
      }
      Haptics.impactAsync(styles[force] ?? Haptics.ImpactFeedbackStyle.Light)
    }
  } catch (erreur) {
    console.warn('Vibration impossible', erreur)
  }
}

export function useEffetsSonores() {
  const { parametres } = useJoueur()

  function jouerSon(nom) {
    if (parametres.son) {
      lireSon(nom)
    }
  }

  function vibrer(force) {
    if (parametres.vibrations) {
      faireVibrer(force)
    }
  }

  return { jouerSon, vibrer }
}
