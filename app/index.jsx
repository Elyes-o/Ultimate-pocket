// Écran de chargement : logo, barre de progression et astuce qui change.
// Quand la barre est pleine ET que la sauvegarde est lue, on passe à l'écran de connexion.
import { useEffect, useRef, useState } from 'react'
import { View, Text, Animated, Easing } from 'react-native'
import { router } from 'expo-router'
import Logo from '../src/composants/Logo'
import { astuces } from '../src/donnees/accueil'
import { useJoueur } from '../src/donnees/JoueurContexte'
import styles from '../src/ecrans/Chargement.styles'

const DUREE_CHARGEMENT = 2800 // en millisecondes
const DUREE_ASTUCE = 1400

export default function EcranChargement() {
  const progression = useRef(new Animated.Value(0)).current
  const [numeroAstuce, setNumeroAstuce] = useState(0)
  const [barrePleine, setBarrePleine] = useState(false)
  const { donneesChargees } = useJoueur()

  // On quitte l'écran seulement quand les deux conditions sont réunies
  useEffect(() => {
    if (barrePleine && donneesChargees) {
      router.replace('/connexion')
    }
  }, [barrePleine, donneesChargees])

  useEffect(() => {
    // 1. On remplit la barre de 0 à 100 %
    Animated.timing(progression, {
      toValue: 1,
      duration: DUREE_CHARGEMENT,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: false,
    }).start(() => setBarrePleine(true))

    // 2. On change d'astuce régulièrement
    const minuteur = setInterval(() => {
      setNumeroAstuce((numero) => (numero + 1) % astuces.length)
    }, DUREE_ASTUCE)

    return () => clearInterval(minuteur)
  }, [])

  const largeurBarre = progression.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] })

  return (
    <View style={styles.ecran}>
      <View style={styles.centre}>
        <Logo />
      </View>

      <View style={styles.bas}>
        <View style={styles.barreFond}>
          <Animated.View style={[styles.barrePleine, { width: largeurBarre }]} />
        </View>
        <Text style={styles.astuceTitre}>ASTUCE</Text>
        <Text style={styles.astuce}>{astuces[numeroAstuce]}</Text>
      </View>
    </View>
  )
}
