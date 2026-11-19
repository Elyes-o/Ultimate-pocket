// Logo texte du jeu : "ULTIMATE" en petit + "Pocket" en grand avec un cristal.
import { View, Text } from 'react-native'
import IconeEclat from './IconeEclat'
import styles from './Logo.styles'
import { couleurs } from '../theme'

export default function Logo({ clair = false }) {
  const couleurTexte = clair ? couleurs.texteInverse : couleurs.texte

  return (
    <View style={styles.conteneur}>
      <Text style={[styles.surTitre, { color: clair ? couleurs.texteInverse : couleurs.principale }]}>
        ULTIMATE
      </Text>
      <View style={styles.ligne}>
        <Text style={[styles.titre, { color: couleurTexte }]}>Pocket</Text>
        <IconeEclat taille={34} style={styles.cristal} />
      </View>
    </View>
  )
}
