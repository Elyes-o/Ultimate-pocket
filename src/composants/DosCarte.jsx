// Dos d'une carte (illustration générée avec Figma), pour la pile de cartes pas encore révélées.
import { View, Image } from 'react-native'
import { RATIO_CARTE } from '../theme'

export default function DosCarte({ largeur, style }) {
  return (
    <View style={[{ width: largeur, height: largeur / RATIO_CARTE, borderRadius: largeur * 0.06, overflow: 'hidden' }, style]}>
      <Image source={require('../../assets/visuels/dos-carte.webp')} style={{ width: '100%', height: '100%' }} />
    </View>
  )
}
