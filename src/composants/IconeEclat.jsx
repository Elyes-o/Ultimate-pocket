// Icône de la monnaie du jeu (le cristal "Éclat", dessiné avec Figma).
import { Image } from 'react-native'

export default function IconeEclat({ taille = 16, style }) {
  return <Image source={require('../../assets/visuels/cristal.png')} style={[{ width: taille, height: taille }, style]} />
}
