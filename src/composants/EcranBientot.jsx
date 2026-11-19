// Écran "Bientôt" réutilisé par les onglets pas encore développés.
import { View, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import styles from './EcranBientot.styles'

export default function EcranBientot({ icone, titre, description, degrade }) {
  return (
    <View style={styles.ecran}>
      <LinearGradient colors={degrade} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.illustration}>
        <Ionicons name={icone} size={56} color="#FFFFFF" />
      </LinearGradient>

      <Text style={styles.titre}>{titre}</Text>
      <Text style={styles.description}>{description}</Text>

      <View style={styles.etiquette}>
        <Ionicons name="time-outline" size={14} color={styles.texteEtiquette.color} />
        <Text style={styles.texteEtiquette}>Prochaine version</Text>
      </View>
    </View>
  )
}
