// Jauge d'Énergie d'un joueur : 10 cases, les cases pleines sont colorées.
import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { ENERGIE_MAX } from '../combat/moteur'
import styles from './JaugeEnergie.styles'

export default function JaugeEnergie({ energie }) {
  const cases = []
  for (let index = 0; index < ENERGIE_MAX; index++) {
    cases.push(<View key={index} style={[styles.case, index < energie && styles.casePleine]} />)
  }

  return (
    <View style={styles.conteneur}>
      <Ionicons name="flash" size={14} color="#F5A524" />
      <Text style={styles.nombre}>{energie}</Text>
      <View style={styles.cases}>{cases}</View>
    </View>
  )
}
