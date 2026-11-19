// Une carte pendant le combat : image, barre de PV qui descend doucement, badges d'état.
// Animations :
//   - entrée : quand une NOUVELLE carte arrive à cette place, elle glisse et grandit
//   - "elan" (id qui change) : la carte fonce vers l'adversaire puis revient
//   - "coup" ({ id, couleur }) : onde de choc colorée + voile rouge + tremblement
import { useEffect, useRef } from 'react'
import { View, Text, Image, Animated, Easing, Platform } from 'react-native'
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
  const voileRouge = useRef(new Animated.Value(0)).current
  const onde = useRef(new Animated.Value(0)).current
  const entree = useRef(new Animated.Value(1)).current
  const pvAnimes = useRef(new Animated.Value(combattant ? combattant.pv : 0)).current
  const numeroPrecedent = useRef(combattant ? combattant.numero : null)

  // Nouvelle carte à cette place : animation d'entrée, et la barre de PV repart de ses vrais PV
  useEffect(() => {
    if (!combattant) {
      return
    }
    if (numeroPrecedent.current !== combattant.numero) {
      numeroPrecedent.current = combattant.numero
      pvAnimes.setValue(combattant.pv)
      entree.setValue(0)
      Animated.spring(entree, { toValue: 1, friction: 6, tension: 60, useNativeDriver: ANIMATION_NATIVE }).start()
    }
  }, [combattant ? combattant.numero : null])

  // Les PV changent : la barre descend (ou remonte) doucement
  useEffect(() => {
    if (!combattant) {
      return
    }
    Animated.timing(pvAnimes, {
      toValue: combattant.pv,
      duration: 600,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false, // une largeur ne peut pas utiliser l'animation native
    }).start()
  }, [combattant ? combattant.pv : null])

  // La carte prend un coup
  useEffect(() => {
    if (!coup) {
      return
    }
    secousse.setValue(0)
    voileRouge.setValue(0)
    onde.setValue(0)
    Animated.parallel([
      Animated.sequence([
        Animated.delay(120),
        Animated.timing(secousse, { toValue: 1, duration: 45, useNativeDriver: ANIMATION_NATIVE }),
        Animated.timing(secousse, { toValue: -1, duration: 45, useNativeDriver: ANIMATION_NATIVE }),
        Animated.timing(secousse, { toValue: 1, duration: 45, useNativeDriver: ANIMATION_NATIVE }),
        Animated.timing(secousse, { toValue: -1, duration: 45, useNativeDriver: ANIMATION_NATIVE }),
        Animated.timing(secousse, { toValue: 0, duration: 45, useNativeDriver: ANIMATION_NATIVE }),
      ]),
      Animated.sequence([
        Animated.delay(120),
        Animated.timing(voileRouge, { toValue: 0.55, duration: 60, useNativeDriver: ANIMATION_NATIVE }),
        Animated.timing(voileRouge, { toValue: 0, duration: 380, useNativeDriver: ANIMATION_NATIVE }),
      ]),
      Animated.sequence([
        Animated.delay(100),
        Animated.timing(onde, { toValue: 1, duration: 450, easing: Easing.out(Easing.quad), useNativeDriver: ANIMATION_NATIVE }),
      ]),
    ]).start()
  }, [coup ? coup.id : null])

  // La carte attaque : elle recule un peu, puis fonce vers l'adversaire
  useEffect(() => {
    if (!elan) {
      return
    }
    avance.setValue(0)
    Animated.sequence([
      Animated.timing(avance, { toValue: -0.25, duration: 90, useNativeDriver: ANIMATION_NATIVE }),
      Animated.timing(avance, { toValue: 1, duration: 110, easing: Easing.in(Easing.quad), useNativeDriver: ANIMATION_NATIVE }),
      Animated.timing(avance, { toValue: 0, duration: 260, easing: Easing.out(Easing.back(1.5)), useNativeDriver: ANIMATION_NATIVE }),
    ]).start()
  }, [elan])

  const hauteur = largeur / RATIO_CARTE
  if (!combattant) {
    return <View style={{ width: largeur, height: hauteur }} />
  }

  const protege = combattant.bouclier > 0 || combattant.bouclierPermanent > 0 || combattant.annuleProchaineAttaque
  const largeurPv = pvAnimes.interpolate({ inputRange: [0, combattant.pvMax], outputRange: ['0%', '100%'], extrapolate: 'clamp' })
  const ratioPv = combattant.pv / combattant.pvMax

  return (
    <Animated.View
      style={{
        width: largeur,
        opacity: entree,
        transform: [
          { translateX: secousse.interpolate({ inputRange: [-1, 1], outputRange: [-7, 7] }) },
          { translateY: avance.interpolate({ inputRange: [-0.25, 0, 1], outputRange: [versLeHaut ? 10 : -10, 0, versLeHaut ? -60 : 60] }) },
          { translateY: entree.interpolate({ inputRange: [0, 1], outputRange: [versLeHaut ? 40 : -40, 0] }) },
          { scale: entree.interpolate({ inputRange: [0, 1], outputRange: [0.7, 1] }) },
        ],
      }}
    >
      {/* Onde de choc colorée (couleur du type de l'attaquant) */}
      {coup && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.onde,
            {
              width: largeur * 1.3,
              height: largeur * 1.3,
              borderRadius: largeur,
              left: -largeur * 0.15,
              top: hauteur / 2 - largeur * 0.65,
              borderColor: coup.couleur,
              opacity: onde.interpolate({ inputRange: [0, 0.2, 1], outputRange: [0, 1, 0] }),
              transform: [{ scale: onde.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1.5] }) }],
            },
          ]}
        />
      )}

      <View style={[styles.cadre, { width: largeur, height: hauteur, borderRadius: largeur * 0.07 }]}>
        <Image source={trouverCarte(combattant.numero).image} style={styles.image} />
        <Animated.View pointerEvents="none" style={[styles.voileRouge, { opacity: voileRouge }]} />
      </View>

      {/* Barre de PV */}
      <View style={styles.barreFond}>
        <Animated.View style={[styles.barrePleine, { width: largeurPv, backgroundColor: couleurPv(ratioPv) }]} />
      </View>
      {detaille ? (
        <View style={styles.ligneInfos}>
          <Text style={styles.textePv}>
            {combattant.pv} <Text style={styles.textePvMax}>/ {combattant.pvMax}</Text>
          </Text>
          <View style={styles.badges}>
            {protege && <Ionicons name="shield" size={14} color="#1FB6E6" />}
            {combattant.bloque && <Ionicons name="lock-closed" size={14} color="#E2483D" />}
            {combattant.fatigueActive && <Ionicons name="moon" size={14} color="#6A7390" />}
          </View>
        </View>
      ) : (
        <Text style={styles.textePvPetit}>{combattant.pv}</Text>
      )}
    </Animated.View>
  )
}
