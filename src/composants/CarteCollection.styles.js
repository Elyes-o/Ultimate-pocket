import { StyleSheet } from 'react-native'
import { couleurs, polices, RATIO_CARTE } from '../theme'

const styles = StyleSheet.create({
  case: {
    flex: 1,
    maxWidth: '32%', // garde 3 colonnes égales, même sur la dernière ligne incomplète
    alignItems: 'center',
  },
  carte: {
    width: '100%',
    aspectRatio: RATIO_CARTE,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  silhouette: {
    backgroundColor: couleurs.surfaceDouce,
    borderWidth: 2,
    borderColor: '#D9DEEA',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  numeroSilhouette: {
    fontFamily: polices.tresGrasse,
    fontSize: 13,
    color: '#A9B0C3',
    marginTop: 2,
  },
  pastilleExemplaires: {
    position: 'absolute',
    top: 4,
    right: 4,
    minWidth: 26,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 999,
    backgroundColor: 'rgba(20, 26, 46, 0.82)',
    alignItems: 'center',
  },
  texteExemplaires: {
    fontFamily: polices.titre,
    fontSize: 11,
    color: couleurs.texteInverse,
  },
  etoiles: {
    flexDirection: 'row',
    gap: 1,
    height: 16,
    alignItems: 'center',
  },
})

export default styles
