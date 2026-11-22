import { StyleSheet } from 'react-native'
import { couleurs, polices } from '../theme'

const styles = StyleSheet.create({
  cadre: {
    overflow: 'hidden',
    backgroundColor: couleurs.surfaceDouce,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  voileRouge: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#E2483D',
  },
  onde: {
    position: 'absolute',
    borderWidth: 6,
  },
  entetePv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 18,
    marginBottom: 2,
  },
  blocPv: {
    alignItems: 'flex-end',
    width: '60%',
  },
  textePv: {
    fontFamily: polices.titre,
    fontSize: 17,
    lineHeight: 18,
    color: couleurs.texte,
    textShadowColor: '#FFFFFF',
    textShadowRadius: 3,
  },
  textePvPetit: {
    fontSize: 12,
    lineHeight: 13,
  },
  barreFond: {
    width: '100%',
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(23,30,51,0.15)',
    overflow: 'hidden',
  },
  barreFondPetite: {
    height: 3,
  },
  barrePleine: {
    height: '100%',
    borderRadius: 3,
  },
  badges: {
    flexDirection: 'row',
    gap: 2,
  },
})

export default styles
