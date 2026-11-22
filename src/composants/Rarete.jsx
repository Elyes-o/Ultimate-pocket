// Rareté d'une carte : des étoiles (1 à 4), ou le logo arc-en-ciel des cartes SECRÈTES (rareté 5).
// "taille" = taille d'une étoile ; "avecTexte" affiche « Secrète » à côté du logo arc-en-ciel.
import { View, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { RARETE_SECRETE } from '../donnees/cartes'
import { couleurs } from '../theme'
import styles, { ARC_EN_CIEL } from './Rarete.styles'

export default function Rarete({ rarete, taille = 12, avecTexte = false }) {
  if (rarete === RARETE_SECRETE) {
    return (
      <LinearGradient
        colors={ARC_EN_CIEL}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={[styles.arcEnCiel, { height: taille + 6, paddingHorizontal: avecTexte ? 8 : 4 }]}
      >
        <Ionicons name="sparkles" size={taille} color={couleurs.texteInverse} />
        {avecTexte && <Text style={[styles.texteSecrete, { fontSize: taille }]}>Secrète</Text>}
      </LinearGradient>
    )
  }

  return (
    <View style={styles.etoiles}>
      {Array.from({ length: rarete }).map((_, index) => (
        <Ionicons key={index} name="star" size={taille} color={couleurs.etoile} />
      ))}
    </View>
  )
}
