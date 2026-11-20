// Fond du jeu : blanc bleuté avec deux faisceaux de fines lignes (turquoise → rose).
// Chaque écran l'utilise comme premier élément (les onglets passent par EcranOnglet) : le fond est donc
// dessiné DANS l'écran, sous son contenu, et il est opaque.
// Piège iPhone : les écrans cachés restent en dessous. Un fond transparent les laisse voir (menus superposés),
// et un fond posé une seule fois autour de la navigation passe devant les écrans.
import { View, Image, StyleSheet } from 'react-native'
import { couleurs } from '../theme'

export default function FondJeu({ children }) {
  return (
    <View style={styles.fond}>
      <Image source={require('../../assets/visuels/fond-vagues.png')} resizeMode="cover" style={styles.image} />
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  fond: {
    flex: 1,
    backgroundColor: couleurs.fond,
  },
  image: {
    // absoluteFill (PAS absoluteFillObject, qui n'existe plus sur téléphone et poussait l'écran vers le bas)
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
})
