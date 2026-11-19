// Page Profil (ouverte depuis l'avatar du bandeau) : écran "Bientôt" en v1, avec un bouton retour.
import { View, Pressable } from 'react-native'
import { router } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import EcranBientot from '../src/composants/EcranBientot'
import { couleurs } from '../src/theme'
import styles from '../src/ecrans/Profil.styles'

export default function EcranProfil() {
  const marges = useSafeAreaInsets()

  return (
    <View style={styles.ecran}>
      <Pressable style={[styles.boutonRetour, { top: marges.top + 10 }]} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={22} color={couleurs.texte} />
      </Pressable>
      <EcranBientot
        icone="person"
        titre="Profil"
        description="Tes victoires et défaites, ta meilleure carte, ta carte favorite et tes paramètres."
        degrade={['#2F9E62', '#7AD69B']}
      />
    </View>
  )
}
