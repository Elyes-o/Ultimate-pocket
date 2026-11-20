// Barre de navigation du bas, dessinée pour le jeu (remplace la barre standard d'expo-router).
// Quatre onglets plats + au centre un gros bouton rond « Combat » qui dépasse de la barre :
// c'est le cœur du jeu, on le voit depuis n'importe quel écran.
import { View, Text, Pressable } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { couleurs } from '../theme'
import styles from './BarreOnglets.styles'

// Icône de chaque onglet (Ionicons), pleine quand l'onglet est ouvert
const icones = {
  accueil: 'home',
  boutique: 'bag-handle',
  combat: 'flash',
  collection: 'albums',
  communaute: 'people',
}

// expo-router donne : state (onglets et onglet ouvert), descriptors (titres), emitter (évènements)
// et navigateToTab (aller sur un onglet).
export default function BarreOnglets({ state, descriptors, emitter, navigateToTab }) {
  const marges = useSafeAreaInsets()

  return (
    <View style={[styles.barre, { paddingBottom: Math.max(marges.bottom, 8) }]}>
      {state.routes.map((route, index) => {
        const actif = state.index === index
        const titre = descriptors[route.key].options.title ?? route.name
        const icone = icones[route.name] ?? 'ellipse'

        function ouvrir() {
          const evenement = emitter.emit({ type: 'tabPress', target: route.key, canPreventDefault: true })
          if (!actif && !evenement.defaultPrevented) {
            navigateToTab(route.key)
          }
        }

        // Le bouton central
        if (route.name === 'combat') {
          return (
            <Pressable key={route.key} style={styles.emplacementCentre} onPress={ouvrir} accessibilityRole="tab" accessibilityLabel={titre} accessibilityState={{ selected: actif }}>
              <View style={[styles.anneauCentre, actif && styles.anneauCentreActif]}>
                <LinearGradient
                  colors={actif ? ['#FFD45C', couleurs.ticket] : ['#3FC6E0', couleurs.principale]}
                  style={styles.boutonCentre}
                >
                  <Ionicons name="flash" size={30} color={couleurs.texteInverse} />
                </LinearGradient>
              </View>
              <Text style={[styles.libelle, styles.libelleCentre, actif && styles.libelleActif]}>{titre}</Text>
            </Pressable>
          )
        }

        return (
          <Pressable key={route.key} style={styles.onglet} onPress={ouvrir} accessibilityRole="tab" accessibilityLabel={titre} accessibilityState={{ selected: actif }}>
            <View style={[styles.fondIcone, actif && styles.fondIconeActif]}>
              <Ionicons name={actif ? icone : icone + '-outline'} size={22} color={actif ? couleurs.principaleFoncee : '#8A9AB0'} />
            </View>
            <Text style={[styles.libelle, actif && styles.libelleActif]} numberOfLines={1}>
              {titre}
            </Text>
          </Pressable>
        )
      })}
    </View>
  )
}
