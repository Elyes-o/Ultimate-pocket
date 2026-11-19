import { StyleSheet } from 'react-native'
import { polices } from '../theme'

const styles = StyleSheet.create({
  conteneur: {
    alignItems: 'center',
  },
  surTitre: {
    fontFamily: polices.tresGrasse,
    fontSize: 14,
    letterSpacing: 6,
  },
  ligne: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titre: {
    fontFamily: polices.titre,
    fontSize: 48,
    letterSpacing: -1,
    lineHeight: 56,
  },
  cristal: {
    marginLeft: 4,
    marginTop: 4,
  },
})

export default styles
