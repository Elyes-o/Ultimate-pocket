import { StyleSheet } from 'react-native'
import { couleurs, espaces, rayons } from '../theme'

const styles = StyleSheet.create({
  ecran: {
    flex: 1,
    backgroundColor: couleurs.fond,
  },
  boutonRetour: {
    position: 'absolute',
    left: espaces.l,
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: rayons.rond,
    backgroundColor: couleurs.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default styles
