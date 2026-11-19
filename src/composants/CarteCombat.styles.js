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
  barreFond: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(23,30,51,0.12)',
    overflow: 'hidden',
    marginTop: 4,
  },
  barrePleine: {
    height: '100%',
    borderRadius: 3,
  },
  ligneInfos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  textePv: {
    fontFamily: polices.tresGrasse,
    fontSize: 12,
    color: couleurs.texte,
  },
  badges: {
    flexDirection: 'row',
    gap: 2,
  },
  degats: {
    position: 'absolute',
    top: '30%',
    alignSelf: 'center',
    fontFamily: polices.titre,
    fontSize: 30,
    color: '#E2483D',
    textShadowColor: '#FFFFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
})

export default styles
