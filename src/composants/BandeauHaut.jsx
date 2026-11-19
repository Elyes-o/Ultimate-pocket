// Bandeau affiché en haut de TOUS les onglets.
// Gauche : avatar + pseudo (→ Profil). Droite : Tickets et Éclats avec "+" (→ Boutique).
import { View, Text, Pressable } from 'react-native'
import { router } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import IconeEclat from './IconeEclat'
import AvatarJoueur from './AvatarJoueur'
import { useJoueur } from '../donnees/JoueurContexte'
import { couleurs } from '../theme'
import styles from './BandeauHaut.styles'

export default function BandeauHaut() {
  const { pseudo, eclats, tickets } = useJoueur()
  const marges = useSafeAreaInsets()

  return (
    <View style={[styles.bandeau, { paddingTop: marges.top + 10 }]}>
      <Pressable style={styles.profil} onPress={() => router.push('/profil')}>
        <AvatarJoueur taille={42} />
        <View>
          <Text style={styles.pseudo}>{pseudo}</Text>
          <Text style={styles.lienProfil}>Voir le profil</Text>
        </View>
      </Pressable>

      <View style={styles.compteurs}>
        <View style={styles.pastille}>
          <Ionicons name="ticket" size={16} color={couleurs.ticket} />
          <Text style={styles.nombre}>{tickets}</Text>
        </View>

        <Pressable style={styles.pastille} onPress={() => router.push('/boutique')}>
          <IconeEclat taille={18} />
          <Text style={styles.nombre}>{eclats.toLocaleString('fr-FR')}</Text>
          <View style={styles.boutonPlus}>
            <Ionicons name="add" size={14} color={couleurs.texteInverse} />
          </View>
        </Pressable>
      </View>
    </View>
  )
}
