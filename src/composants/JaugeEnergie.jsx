// Jauge d'Énergie d'un joueur : 10 cases.
//   - "apercu" : nombre de cases que l'action choisie va dépenser (elles clignotent)
//   - quand l'Énergie augmente, les nouvelles cases "pop" et un "+X" s'envole
//   - "compacte" : petite version (pour le bot)
import { useEffect, useRef, useState } from 'react'
import { View, Text, Animated, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { ENERGIE_MAX } from '../combat/moteur'
import styles from './JaugeEnergie.styles'

const ANIMATION_NATIVE = Platform.OS !== 'web'

export default function JaugeEnergie({ energie, apercu = 0, compacte = false }) {
  const clignotement = useRef(new Animated.Value(1)).current
  const pop = useRef(new Animated.Value(1)).current
  const envol = useRef(new Animated.Value(1)).current
  const energiePrecedente = useRef(energie)
  const [gain, setGain] = useState(null) // { quantite, depuis }

  // Les cases de l'aperçu clignotent en boucle
  useEffect(() => {
    if (apercu <= 0) {
      clignotement.setValue(1)
      return
    }
    const boucle = Animated.loop(
      Animated.sequence([
        Animated.timing(clignotement, { toValue: 0.25, duration: 350, useNativeDriver: ANIMATION_NATIVE }),
        Animated.timing(clignotement, { toValue: 1, duration: 350, useNativeDriver: ANIMATION_NATIVE }),
      ])
    )
    boucle.start()
    return () => boucle.stop()
  }, [apercu])

  // L'Énergie augmente : les nouvelles cases grossissent un instant, et "+X" s'envole
  useEffect(() => {
    const difference = energie - energiePrecedente.current
    if (difference > 0) {
      setGain({ quantite: difference, depuis: energiePrecedente.current })
      pop.setValue(0)
      envol.setValue(0)
      Animated.parallel([
        Animated.spring(pop, { toValue: 1, friction: 4, useNativeDriver: ANIMATION_NATIVE }),
        Animated.timing(envol, { toValue: 1, duration: 1000, useNativeDriver: ANIMATION_NATIVE }),
      ]).start(() => setGain(null))
    }
    energiePrecedente.current = energie
  }, [energie])

  const cases = []
  for (let index = 0; index < ENERGIE_MAX; index++) {
    const pleine = index < energie
    const depensee = pleine && index >= energie - apercu
    const nouvelle = gain && index >= gain.depuis && index < energie
    cases.push(
      <Animated.View
        key={index}
        style={[
          styles.case,
          compacte && styles.caseCompacte,
          pleine && styles.casePleine,
          depensee && { opacity: clignotement },
          nouvelle && { transform: [{ scaleY: pop.interpolate({ inputRange: [0, 1], outputRange: [1.8, 1] }) }] },
        ]}
      />
    )
  }

  return (
    <View style={styles.conteneur}>
      <Ionicons name="flash" size={compacte ? 12 : 16} color="#F5A524" />
      <Text style={[styles.nombre, compacte && styles.nombreCompact]}>{energie}</Text>
      <View style={styles.cases}>{cases}</View>
      {gain && (
        <Animated.Text
          style={[
            styles.gain,
            {
              opacity: envol.interpolate({ inputRange: [0, 0.7, 1], outputRange: [1, 1, 0] }),
              transform: [{ translateY: envol.interpolate({ inputRange: [0, 1], outputRange: [0, -22] }) }],
            },
          ]}
        >
          +{gain.quantite} ⚡
        </Animated.Text>
      )}
    </View>
  )
}
