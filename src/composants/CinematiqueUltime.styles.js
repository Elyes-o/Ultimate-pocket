import { StyleSheet } from 'react-native'
import { couleurs, espaces, polices, RATIO_CARTE } from '../theme'

const LARGEUR_CARTE = 92

const styles = StyleSheet.create({
  fond: {
    flex: 1,
    backgroundColor: 'rgba(8, 10, 24, 0.94)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: espaces.l,
  },
  camp: {
    fontFamily: polices.tresGrasse,
    fontSize: 12,
    letterSpacing: 3,
    color: '#F7B731',
    marginBottom: espaces.xl,
  },
  rangee: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: espaces.xxl,
  },
  carte: {
    width: LARGEUR_CARTE,
    height: LARGEUR_CARTE / RATIO_CARTE,
    borderRadius: 8,
    overflow: 'hidden',
    marginHorizontal: -10,
    borderWidth: 2,
    borderColor: '#F7B731',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  nomCombo: {
    fontFamily: polices.tresGrasse,
    fontSize: 14,
    letterSpacing: 2,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
  },
  nomUltime: {
    fontFamily: polices.titre,
    fontSize: 36,
    color: couleurs.texteInverse,
    textAlign: 'center',
    textShadowColor: '#F7B731',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 18,
  },
  flash: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#FFFFFF',
  },
})

export default styles
