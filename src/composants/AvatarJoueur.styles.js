import { StyleSheet } from 'react-native'
import { couleurs, polices } from '../theme'

const styles = StyleSheet.create({
  cercle: {
    borderRadius: 999,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: couleurs.surface,
    backgroundColor: couleurs.surfaceDouce,
  },
  cercleInitiale: {
    backgroundColor: couleurs.principale,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initiale: {
    fontFamily: polices.titre,
    color: couleurs.texteInverse,
  },
})

export default styles
