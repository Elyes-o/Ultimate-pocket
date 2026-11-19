// Mini-cinématique d'un Ultime (~2,6 s) :
// l'écran s'assombrit, les cartes du combo arrivent ensemble, le nom de l'Ultime explose, puis un flash.
import { useEffect, useRef } from 'react'
import { View, Text, Image, Modal, Animated, Easing, Platform } from 'react-native'
import { trouverCarte } from '../donnees/cartes'
import styles from './CinematiqueUltime.styles'

const ANIMATION_NATIVE = Platform.OS !== 'web'

export default function CinematiqueUltime({ cinematique, quandFinie }) {
  const fond = useRef(new Animated.Value(0)).current
  const arrivee = useRef(new Animated.Value(0)).current
  const titre = useRef(new Animated.Value(0)).current
  const flash = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (!cinematique) {
      return
    }
    fond.setValue(0)
    arrivee.setValue(0)
    titre.setValue(0)
    flash.setValue(0)
    Animated.sequence([
      Animated.timing(fond, { toValue: 1, duration: 250, useNativeDriver: ANIMATION_NATIVE }),
      Animated.timing(arrivee, { toValue: 1, duration: 500, easing: Easing.out(Easing.back(1.4)), useNativeDriver: ANIMATION_NATIVE }),
      Animated.spring(titre, { toValue: 1, friction: 5, useNativeDriver: ANIMATION_NATIVE }),
      Animated.delay(700),
      Animated.timing(flash, { toValue: 1, duration: 150, useNativeDriver: ANIMATION_NATIVE }),
      Animated.timing(flash, { toValue: 0, duration: 250, useNativeDriver: ANIMATION_NATIVE }),
    ]).start(() => quandFinie())
  }, [cinematique])

  if (!cinematique) {
    return null
  }

  const nombreCartes = cinematique.numeros.length

  return (
    <Modal visible transparent animationType="none">
      <Animated.View style={[styles.fond, { opacity: fond }]}>
        <Text style={styles.camp}>{cinematique.camp === 'joueur' ? 'TON ULTIME' : 'ULTIME ADVERSE'}</Text>

        <View style={styles.rangee}>
          {cinematique.numeros.map((numero, index) => {
            // Les cartes de gauche arrivent par la gauche, celles de droite par la droite
            const depuisLaGauche = index < nombreCartes / 2
            return (
              <Animated.View
                key={numero}
                style={[
                  styles.carte,
                  {
                    transform: [
                      { translateX: arrivee.interpolate({ inputRange: [0, 1], outputRange: [depuisLaGauche ? -400 : 400, 0] }) },
                      { rotate: (index - (nombreCartes - 1) / 2) * 8 + 'deg' },
                    ],
                  },
                ]}
              >
                <Image source={trouverCarte(numero).image} style={styles.image} />
              </Animated.View>
            )
          })}
        </View>

        <Animated.View style={{ opacity: titre, transform: [{ scale: titre.interpolate({ inputRange: [0, 1], outputRange: [2.5, 1] }) }] }}>
          <Text style={styles.nomCombo}>{cinematique.combo.nom}</Text>
          <Text style={styles.nomUltime}>{cinematique.combo.ultime}</Text>
        </Animated.View>

        <Animated.View pointerEvents="none" style={[styles.flash, { opacity: flash }]} />
      </Animated.View>
    </Modal>
  )
}
