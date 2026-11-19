// Fausse publicité (v1) : un écran plein avec un compte à rebours.
// Quand le compte à rebours est fini, le joueur peut fermer et reçoit sa récompense.
// Plus tard, on remplacera ce composant par une vraie pub récompensée (ex. Google AdMob).
import { useEffect, useState } from 'react'
import { View, Text, Pressable, Modal } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import styles from './FenetrePub.styles'

const DUREE_PUB = 5 // secondes (une vraie pub dure plutôt 15 à 30 s)

export default function FenetrePub({ visible, quandTerminee, quandAnnulee }) {
  const [secondesRestantes, setSecondesRestantes] = useState(DUREE_PUB)

  // À chaque ouverture : on relance le compte à rebours
  useEffect(() => {
    if (!visible) {
      return
    }
    setSecondesRestantes(DUREE_PUB)
    const minuteur = setInterval(() => {
      setSecondesRestantes((secondes) => Math.max(0, secondes - 1))
    }, 1000)
    return () => clearInterval(minuteur)
  }, [visible])

  const pubFinie = secondesRestantes === 0

  return (
    <Modal visible={visible} animationType="fade" onRequestClose={quandAnnulee}>
      <LinearGradient colors={['#1B1F3B', '#3A2E7A']} style={styles.ecran}>
        <View style={styles.haut}>
          <Text style={styles.etiquette}>PUBLICITÉ</Text>
          {pubFinie ? (
            <Pressable style={styles.boutonFermer} onPress={quandTerminee} accessibilityLabel="Fermer la pub">

              <Ionicons name="close" size={20} color="#FFFFFF" />
            </Pressable>
          ) : (
            <View style={styles.compteur}>
              <Text style={styles.texteCompteur}>{secondesRestantes}</Text>
            </View>
          )}
        </View>

        <View style={styles.centre}>
          <Ionicons name="play-circle" size={72} color="rgba(255,255,255,0.85)" />
          <Text style={styles.titre}>Ta pub ici</Text>
          <Text style={styles.texte}>Simulation d'une publicité récompensée.</Text>
        </View>

        <Text style={styles.bas}>
          {pubFinie ? 'Touche la croix pour récupérer ta récompense' : 'Récompense dans ' + secondesRestantes + ' s…'}
        </Text>
      </LinearGradient>
    </Modal>
  )
}
