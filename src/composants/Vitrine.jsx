// Vitrine de l'accueil : diapositives qui défilent toutes seules (le "panneau publicitaire" du jeu).
import { useEffect, useRef, useState } from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { diapositivesVitrine } from '../donnees/accueil'
import styles from './Vitrine.styles'

const DELAI_DEFILEMENT = 5000 // une nouvelle diapositive toutes les 5 secondes

// Positions des cartes à droite d'une diapositive (1 ou 3 cartes en éventail)
const positionsCartes = [styles.carteArriereGauche, styles.carteArriereDroite, styles.carteDevant]

function Diapositive({ diapositive, largeur }) {
  const cartesSeule = diapositive.cartes.length === 1

  return (
    <View style={[styles.page, { width: largeur }]}>
      <LinearGradient colors={diapositive.degrade} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.diapositive}>
        {/* Illustration de fond, puis un voile sombre à gauche pour que le texte reste lisible */}
        <Image source={diapositive.fond} style={styles.fond} resizeMode="cover" />
        <LinearGradient
          colors={['rgba(10,14,30,0.6)', 'rgba(10,14,30,0)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0.75, y: 0 }}
          style={styles.fond}
        />

        <View style={styles.textes}>
          <View style={styles.badge}>
            <Text style={styles.texteBadge}>{diapositive.badge}</Text>
          </View>
          <Text style={styles.titre}>{diapositive.titre}</Text>
          <Text style={styles.sousTitre}>{diapositive.sousTitre}</Text>
        </View>

        <View style={styles.zoneCartes}>
          {diapositive.cartes.map((carte, index) => (
            <Image
              key={carte.numero}
              source={carte.image}
              style={[styles.carte, cartesSeule ? styles.carteSeule : positionsCartes[index]]}
            />
          ))}
        </View>
      </LinearGradient>
    </View>
  )
}

export default function Vitrine() {
  const defilement = useRef(null)
  const [largeur, setLargeur] = useState(0)
  const [pageActive, setPageActive] = useState(0)

  // Défilement automatique vers la diapositive suivante
  useEffect(() => {
    if (largeur === 0) {
      return
    }
    const minuteur = setInterval(() => {
      const pageSuivante = (pageActive + 1) % diapositivesVitrine.length
      defilement.current?.scrollTo({ x: pageSuivante * largeur, animated: true })
      setPageActive(pageSuivante)
    }, DELAI_DEFILEMENT)
    return () => clearInterval(minuteur)
  }, [pageActive, largeur])

  // Quand le joueur fait glisser à la main, on met à jour le point actif
  function quandOnFaitDefiler(evenement) {
    const page = Math.round(evenement.nativeEvent.contentOffset.x / largeur)
    if (page !== pageActive) {
      setPageActive(page)
    }
  }

  return (
    <View onLayout={(evenement) => setLargeur(evenement.nativeEvent.layout.width)}>
      <ScrollView
        ref={defilement}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={quandOnFaitDefiler}
        scrollEventThrottle={32}
      >
        {diapositivesVitrine.map((diapositive) => (
          <Diapositive key={diapositive.id} diapositive={diapositive} largeur={largeur} />
        ))}
      </ScrollView>

      <View style={styles.points}>
        {diapositivesVitrine.map((diapositive, index) => (
          <View key={diapositive.id} style={[styles.point, index === pageActive && styles.pointActif]} />
        ))}
      </View>
    </View>
  )
}
