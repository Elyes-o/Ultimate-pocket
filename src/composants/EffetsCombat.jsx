// Petits effets visuels du combat, posés PAR-DESSUS l'arène :
//   - DegatsFlottants : gros chiffre de dégâts qui saute puis s'envole (+ badge "Faiblesse x2")
//   - CarteKo         : la carte mise KO grisit, tombe en tournant, avec un tampon "KO !"
//   - BandeauTour     : "À toi de jouer" / "Tour du bot" qui glisse à chaque changement de tour
import { useEffect, useRef } from 'react'
import { View, Text, Image, Animated, Easing, Platform } from 'react-native'
import { trouverCarte } from '../donnees/cartes'
import { RATIO_CARTE } from '../theme'
import styles from './EffetsCombat.styles'

const ANIMATION_NATIVE = Platform.OS !== 'web'

export function DegatsFlottants({ evenement }) {
  const animation = useRef(new Animated.Value(0)).current

  useEffect(() => {
    animation.setValue(0)
    Animated.timing(animation, { toValue: 1, duration: 1300, useNativeDriver: ANIMATION_NATIVE }).start()
  }, [evenement.id])

  const texte = evenement.degats > 0 ? '-' + evenement.degats : 'Bloqué !'

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.degats,
        {
          opacity: animation.interpolate({ inputRange: [0, 0.1, 0.75, 1], outputRange: [0, 1, 1, 0] }),
          transform: [
            { translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [10, -40] }) },
            { scale: animation.interpolate({ inputRange: [0, 0.12, 0.25, 1], outputRange: [0.4, 1.5, 1, 1] }) },
          ],
        },
      ]}
    >
      <Text style={styles.texteDegats}>{texte}</Text>
      {evenement.faiblesse && (
        <View style={styles.badgeFaiblesse}>
          <Text style={styles.texteFaiblesse}>FAIBLESSE ×2</Text>
        </View>
      )}
    </Animated.View>
  )
}

export function CarteKo({ combattant, largeur, versLeHaut, idEvenement }) {
  const chute = useRef(new Animated.Value(0)).current

  useEffect(() => {
    chute.setValue(0)
    Animated.sequence([
      Animated.delay(250),
      Animated.timing(chute, { toValue: 1, duration: 900, easing: Easing.in(Easing.quad), useNativeDriver: ANIMATION_NATIVE }),
    ]).start()
  }, [idEvenement])

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.carteKo,
        {
          width: largeur,
          opacity: chute.interpolate({ inputRange: [0, 0.7, 1], outputRange: [1, 0.8, 0] }),
          transform: [
            { translateY: chute.interpolate({ inputRange: [0, 1], outputRange: [0, versLeHaut ? 60 : -60] }) },
            { rotate: chute.interpolate({ inputRange: [0, 1], outputRange: ['0deg', versLeHaut ? '-18deg' : '18deg'] }) },
            { scale: chute.interpolate({ inputRange: [0, 1], outputRange: [1, 0.8] }) },
          ],
        },
      ]}
    >
      <View style={[styles.cadreKo, { width: largeur, height: largeur / RATIO_CARTE, borderRadius: largeur * 0.07 }]}>
        <Image source={trouverCarte(combattant.numero).image} style={styles.imageKo} />
        <View style={styles.voileGris} />
      </View>
      <View style={styles.tamponKo}>
        <Text style={styles.texteTamponKo}>KO !</Text>
      </View>
    </Animated.View>
  )
}

export function BandeauTour({ tour, numeroTour }) {
  const apparition = useRef(new Animated.Value(0)).current

  useEffect(() => {
    apparition.setValue(0)
    Animated.spring(apparition, { toValue: 1, friction: 7, tension: 80, useNativeDriver: ANIMATION_NATIVE }).start()
  }, [numeroTour])

  const aToi = tour === 'joueur'
  return (
    <Animated.View
      style={[
        styles.bandeau,
        aToi ? styles.bandeauJoueur : styles.bandeauBot,
        {
          opacity: apparition,
          transform: [{ translateX: apparition.interpolate({ inputRange: [0, 1], outputRange: [aToi ? -60 : 60, 0] }) }],
        },
      ]}
    >
      <Text style={[styles.texteBandeau, aToi ? styles.texteBandeauJoueur : styles.texteBandeauBot]}>
        {aToi ? 'À toi de jouer' : 'Tour du bot'}
      </Text>
    </Animated.View>
  )
}
