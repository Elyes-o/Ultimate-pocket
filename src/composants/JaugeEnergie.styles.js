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
    fontSize: 17,
    color: couleurs.texte,
    minWidth: 22,
  },
  nombreCompact: {
    fontSize: 13,
    minWidth: 16,
  },
  cases: {
    flex: 1,
    flexDirection: 'row',
    gap: 3,
  },
  case: {
    flex: 1,
    height: 14,
    borderRadius: 4,
    backgroundColor: 'rgba(23,30,51,0.1)',
  },
  caseCompacte: {
    height: 7,
    borderRadius: 2,
  },
  casePleine: {
    backgroundColor: '#F5A524',
  },
  gain: {
    position: 'absolute',
    right: 0,
    top: -6,
    fontFamily: polices.titre,
    fontSize: 14,
    color: '#B5700A',
  },
})

export default styles
