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
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#E2483D',
  },
  onde: {
    position: 'absolute',
    borderWidth: 6,
  },
  barreFond: {
    height: 7,
    borderRadius: 4,
    backgroundColor: 'rgba(23,30,51,0.12)',
    overflow: 'hidden',
    marginTop: 4,
  },
  barrePleine: {
    height: '100%',
    borderRadius: 4,
  },
  ligneInfos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  textePv: {
    fontFamily: polices.titre,
    fontSize: 14,
    color: couleurs.texte,
  },
  textePvMax: {
    fontFamily: polices.grasse,
    fontSize: 11,
    color: couleurs.texteSecondaire,
  },
  textePvPetit: {
    fontFamily: polices.tresGrasse,
    fontSize: 11,
    color: couleurs.texte,
    textAlign: 'center',
  },
  badges: {
    flexDirection: 'row',
    gap: 2,
  },
})

export default styles
