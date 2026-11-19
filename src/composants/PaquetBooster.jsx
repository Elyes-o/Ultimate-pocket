// Paquet de booster illustré (visuels générés avec Figma, dans assets/visuels/).
// Verrouillé : assombri avec un cadenas. Légendaire : contour doré et petite étoile.
import { View, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { RATIO_BOOSTER } from '../theme'
import styles from './PaquetBooster.styles'

export default function PaquetBooster({ visuel, verrouille = false, legendaire = false, largeur = 72 }) {
  const hauteur = largeur / RATIO_BOOSTER

  return (
    <View style={[styles.paquet, { width: largeur, height: hauteur }, legendaire && styles.paquetLegendaire]}>
      <Image source={visuel} style={styles.image} resizeMode="contain" />
      {legendaire && (
        <View style={[styles.etoile, { width: largeur * 0.36, height: largeur * 0.36 }]}>
          <Ionicons name="star" size={largeur * 0.22} color="#FFFFFF" />
        </View>
      )}
      {verrouille && (
        <View style={styles.voile}>
          <Ionicons name="lock-closed" size={largeur * 0.32} color="#FFFFFF" />
        </View>
      )}
    </View>
  )
}
