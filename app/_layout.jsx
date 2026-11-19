// Mise en page racine : charge les polices, partage les données du joueur
// et déclare la pile d'écrans (chargement → connexion → onglets).
import { View, StyleSheet } from 'react-native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import {
  useFonts,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  Nunito_900Black,
} from '@expo-google-fonts/nunito'
import { JoueurFournisseur } from '../src/donnees/JoueurContexte'
import { couleurs } from '../src/theme'

export default function MiseEnPageRacine() {
  const [policesChargees] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Nunito_900Black,
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
          <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: couleurs.fond } }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="connexion" options={{ animation: 'fade' }} />
            <Stack.Screen name="(onglets)" options={{ animation: 'fade' }} />
            <Stack.Screen name="profil" options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="ouverture" options={{ animation: 'fade', presentation: 'fullScreenModal', gestureEnabled: false }} />
            <Stack.Screen name="deck" options={{ animation: 'slide_from_right' }} />
            <Stack.Screen name="partie" options={{ animation: 'fade', gestureEnabled: false }} />
          </Stack>
        </View>
      </View>
    </JoueurFournisseur>
  )
}

const styles = StyleSheet.create({
  fondExterieur: {
    flex: 1,
    backgroundColor: '#DCE1EC',
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
