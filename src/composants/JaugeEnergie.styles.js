import { StyleSheet } from 'react-native'
import { couleurs, polices } from '../theme'

const styles = StyleSheet.create({
  conteneur: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  nombre: {
    fontFamily: polices.titre,
    fontSize: 15,
    color: couleurs.texte,
    width: 20,
  },
  cases: {
    flex: 1,
    flexDirection: 'row',
    gap: 2,
  },
  case: {
    flex: 1,
    height: 10,
    borderRadius: 3,
    backgroundColor: 'rgba(23,30,51,0.12)',
  },
  casePleine: {
    backgroundColor: '#F5A524',
  },
})

export default styles
