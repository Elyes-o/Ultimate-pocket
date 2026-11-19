import { StyleSheet } from 'react-native'
import { couleurs, espaces, rayons, polices, tailles } from '../theme'

const styles = StyleSheet.create({
  ecran: {
    flex: 1,
    backgroundColor: couleurs.fond,
    paddingHorizontal: espaces.xxl,
  },
  centre: {
    flex: 1,
    justifyContent: 'center',
  },
  bas: {
    paddingBottom: 64,
    alignItems: 'center',
  },
  barreFond: {
    width: '100%',
    height: 10,
    borderRadius: rayons.rond,
    backgroundColor: couleurs.surfaceDouce,
    overflow: 'hidden',
    marginBottom: espaces.xl,
  },
  barrePleine: {
    height: '100%',
    borderRadius: rayons.rond,
    backgroundColor: couleurs.principale,
  },
  astuceTitre: {
    fontFamily: polices.tresGrasse,
    fontSize: tailles.petite,
    letterSpacing: 2,
    color: couleurs.principale,
    marginBottom: espaces.xs,
  },
  astuce: {
    fontFamily: polices.normale,
    fontSize: tailles.normale,
    color: couleurs.texteSecondaire,
    textAlign: 'center',
    minHeight: 44,
  },
})

export default styles
