// Paquet de booster illustré (visuels générés avec Figma, dans assets/visuels/).
// Si le booster est verrouillé, on l'assombrit et on ajoute un cadenas.
import { View, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { RATIO_BOOSTER } from '../theme'
import styles from './PaquetBooster.styles'

export default function PaquetBooster({ visuel, verrouille = false, largeur = 72 }) {
  const hauteur = largeur / RATIO_BOOSTER

  return (
    <View style={[styles.paquet, { width: largeur, height: hauteur }]}>
      <Image source={visuel} style={styles.image} resizeMode="contain" />
      {verrouille && (
        <View style={styles.voile}>
          <Ionicons name="lock-closed" size={largeur * 0.32} color="#FFFFFF" />
        </View>
      )}
    </View>
  )
}
