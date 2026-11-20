// Bulle du guide (Impa) pendant le tutoriel de combat.
// Elle glisse à chaque nouvelle étape. Bouton « Suivant » seulement quand l'étape l'attend.
import { useEffect, useRef } from 'react'
import { View, Text, Image, Pressable, Animated, Platform } from 'react-native'
import { trouverCarte } from '../donnees/cartes'
import styles from './BulleTutoriel.styles'

const ANIMATION_NATIVE = Platform.OS !== 'web'

export default function BulleTutoriel({ etape, numeroEtape, totalEtapes, quandSuivant, style }) {
  const apparition = useRef(new Animated.Value(0)).current

  useEffect(() => {
    apparition.setValue(0)
    Animated.spring(apparition, { toValue: 1, friction: 7, tension: 70, useNativeDriver: ANIMATION_NATIVE }).start()
  }, [numeroEtape])

  if (!etape) {
    return null
  }
  return (
    <Animated.View
      pointerEvents="box-none"
      style={[
        styles.bulle,
        style,
        {
          opacity: apparition,
          transform: [{ translateY: apparition.interpolate({ inputRange: [0, 1], outputRange: [-16, 0] }) }],
        },
      ]}
    >
      <View style={styles.portrait}>
        <Image source={trouverCarte(4).image} style={styles.imagePortrait} />
      </View>
      <View style={styles.contenu}>
        <View style={styles.ligneTitre}>
          <Text style={styles.nomGuide}>Impa</Text>
          <Text style={styles.progression}>
            {numeroEtape + 1} / {totalEtapes}
          </Text>
        </View>
        <Text style={styles.texte}>{etape.texte}</Text>
        {etape.attend === 'suivant' && (
          <Pressable style={styles.boutonSuivant} onPress={quandSuivant}>
            <Text style={styles.texteSuivant}>Suivant</Text>
          </Pressable>
        )}
      </View>
    </Animated.View>
  )
}
