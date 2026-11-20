// Mise en page racine : charge les polices, partage les données du joueur
// et déclare la pile d'écrans (chargement → connexion → onglets).
import { View, StyleSheet } from 'react-native'
import { Stack, ThemeProvider, DefaultTheme } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import {
  useFonts,
  MPLUSRounded1c_500Medium,
  MPLUSRounded1c_700Bold,
  MPLUSRounded1c_800ExtraBold,
  MPLUSRounded1c_900Black,
} from '@expo-google-fonts/m-plus-rounded-1c'
import { JoueurFournisseur } from '../src/donnees/JoueurContexte'
import { couleurs } from '../src/theme'

// Navigation TRANSPARENTE (thème + contentStyle) : c'est chaque écran qui dessine son fond opaque (FondJeu).
// Sur iPhone, un fond opaque donné à la navigation passait DEVANT les écrans (on ne voyait plus que le fond).
const themeNavigation = { ...DefaultTheme, colors: { ...DefaultTheme.colors, background: 'transparent' } }

export default function MiseEnPageRacine() {
  const [policesChargees] = useFonts({
    MPLUSRounded1c_500Medium,
    MPLUSRounded1c_700Bold,
    MPLUSRounded1c_800ExtraBold,
    MPLUSRounded1c_900Black,
  })

  // On attend les polices pour éviter un "saut" de texte au démarrage
  if (!policesChargees) {
    return null
  }

  return (
    <JoueurFournisseur>
      <StatusBar style="dark" />
      {/* Sur ordinateur (web), on garde un format téléphone centré */}
      <View style={styles.fondExterieur}>
        <View style={styles.cadreTelephone}>
          <ThemeProvider value={themeNavigation}>
            <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' } }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="connexion" options={{ animation: 'fade' }} />
              <Stack.Screen name="(onglets)" options={{ animation: 'fade' }} />
              <Stack.Screen name="profil" options={{ animation: 'slide_from_right' }} />
              <Stack.Screen name="ouverture" options={{ animation: 'fade', presentation: 'fullScreenModal', gestureEnabled: false }} />
              <Stack.Screen name="deck" options={{ animation: 'slide_from_right' }} />
              <Stack.Screen name="partie" options={{ animation: 'fade', gestureEnabled: false }} />
            </Stack>
          </ThemeProvider>
        </View>
      </View>
    </JoueurFournisseur>
  )
}

const styles = StyleSheet.create({
  fondExterieur: {
    flex: 1,
    backgroundColor: '#E3E8EF',
  },
  cadreTelephone: {
    flex: 1,
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    backgroundColor: couleurs.fond,
    overflow: 'hidden',
  },
})
