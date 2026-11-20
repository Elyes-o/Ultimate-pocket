import { StyleSheet } from 'react-native'
import { couleurs, polices } from '../theme'

const styles = StyleSheet.create({
  conteneur: {
    alignItems: 'center',
  },
  // Étiquette dorée, légèrement penchée, comme un autocollant sur un classeur
  etiquette: {
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 8,
    backgroundColor: couleurs.ticket,
    borderBottomWidth: 3,
    borderBottomColor: couleurs.ticketFonce,
    transform: [{ rotate: '-4deg' }],
    marginBottom: -6,
    zIndex: 1,
  },
  surTitre: {
    fontFamily: polices.titre,
    fontSize: 16,
    color: couleurs.texte,
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
