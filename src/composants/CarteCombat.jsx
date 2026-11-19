// Une carte pendant le combat : image, barre de PV, petits badges d'état.
// Animations :
//   - "elan" (change à chaque attaque de cette carte) : la carte s'élance vers l'adversaire
//   - "coup" ({ id, degats }) : la carte tremble et les dégâts s'envolent au-dessus
import { useEffect, useRef, useState } from 'react'
import { View, Text, Image, Animated, Platform } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { trouverCarte } from '../donnees/cartes'
import { RATIO_CARTE } from '../theme'
import styles from './CarteCombat.styles'

const ANIMATION_NATIVE = Platform.OS !== 'web'

function couleurPv(ratio) {
  if (ratio > 0.5) {
    return '#22B573'
  }
  if (ratio > 0.25) {
    return '#F5A524'
  }
  return '#E2483D'
}

export default function CarteCombat({ combattant, largeur, coup, elan, versLeHaut, detaille = true }) {
  const secousse = useRef(new Animated.Value(0)).current
  const avance = useRef(new Animated.Value(0)).current
  const envol = useRef(new Animated.Value(0)).current
  const [degatsAffiches, setDegatsAffiches] = useState(null)

  // La carte prend un coup : elle tremble, et on affiche les dégâts
  useEffect(() => {
    if (!coup) {
      return
    }
    secousse.setValue(0)
    Animated.sequence([
      Animated.timing(secousse, { toValue: 1, duration: 50, useNativeDriver: ANIMATION_NATIVE }),
      Animated.timing(secousse, { toValue: -1, duration: 50, useNativeDriver: ANIMATION_NATIVE }),
      Animated.timing(secousse, { toValue: 1, duration: 50, useNativeDriver: ANIMATION_NATIVE }),
      Animated.timing(secousse, { toValue: -1, duration: 50, useNativeDriver: ANIMATION_NATIVE }),
      Animated.timing(secousse, { toValue: 0, duration: 50, useNativeDriver: ANIMATION_NATIVE }),
    ]).start()
    if (coup.degats !== undefined) {
      setDegatsAffiches(coup.degats)
      envol.setValue(0)
      Animated.timing(envol, { toValue: 1, duration: 1100, useNativeDriver: ANIMATION_NATIVE }).start(() =>
        setDegatsAffiches(null)
      )
    }
  }, [coup ? coup.id : null])

  // La carte attaque : elle s'élance vers l'adversaire puis revient
  useEffect(() => {
    if (!elan) {
      return
    }
    avance.setValue(0)
    Animated.sequence([
      Animated.timing(avance, { toValue: 1, duration: 140, useNativeDriver: ANIMATION_NATIVE }),
      Animated.timing(avance, { toValue: 0, duration: 220, useNativeDriver: ANIMATION_NATIVE }),
    ]).start()
  }, [elan])

  if (!combattant) {
    return <View style={{ width: largeur, height: largeur / RATIO_CARTE }} />
  }

  const ratioPv = combattant.pv / combattant.pvMax
  const protege = combattant.bouclier > 0 || combattant.bouclierPermanent > 0 || combattant.annuleProchaineAttaque

  return (
    <Animated.View
      style={{
        width: largeur,
        transform: [
          { translateX: secousse.interpolate({ inputRange: [-1, 1], outputRange: [-6, 6] }) },
          { translateY: avance.interpolate({ inputRange: [0, 1], outputRange: [0, versLeHaut ? -28 : 28] }) },
        ],
      }}
    >
      <View style={[styles.cadre, { width: largeur, height: largeur / RATIO_CARTE, borderRadius: largeur * 0.07 }]}>
        <Image source={trouverCarte(combattant.numero).image} style={styles.image} />
      </View>

      {/* Barre de PV */}
      <View style={styles.barreFond}>
        <View style={[styles.barrePleine, { width: ratioPv * 100 + '%', backgroundColor: couleurPv(ratioPv) }]} />
      </View>
      {detaille && (
        <View style={styles.ligneInfos}>
          <Text style={styles.textePv}>
            {combattant.pv}/{combattant.pvMax}
          </Text>
          <View style={styles.badges}>
            {protege && <Ionicons name="shield" size={13} color="#1FB6E6" />}
            {combattant.bloque && <Ionicons name="lock-closed" size={13} color="#E2483D" />}
            {combattant.fatigueActive && <Ionicons name="moon" size={13} color="#6A7390" />}
          </View>
        </View>
      )}

      {/* Dégâts qui s'envolent */}
      {degatsAffiches !== null && (
        <Animated.Text
          style={[
            styles.degats,
            {
              opacity: envol.interpolate({ inputRange: [0, 0.7, 1], outputRange: [1, 1, 0] }),
              transform: [
                { translateY: envol.interpolate({ inputRange: [0, 1], outputRange: [0, -50] }) },
                { scale: envol.interpolate({ inputRange: [0, 0.15, 1], outputRange: [0.6, 1.3, 1] }) },
              ],
            },
          ]}
        >
          {degatsAffiches > 0 ? '-' + degatsAffiches : 'Bloqué !'}
        </Animated.Text>
      )}
    </Animated.View>
  )
}
