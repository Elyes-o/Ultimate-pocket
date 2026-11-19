import { StyleSheet } from 'react-native'
import { couleurs, espaces, rayons, polices, tailles, ombre, ESPACE_BARRE_NAVIGATION } from '../theme'

const styles = StyleSheet.create({
  ecran: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: espaces.xxl,
    paddingBottom: ESPACE_BARRE_NAVIGATION,
  },
  illustration: {
    width: 128,
    height: 128,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: espaces.xl,
    transform: [{ rotate: '-6deg' }],
    ...ombre,
  },
  titre: {
    fontFamily: polices.titre,
    fontSize: tailles.titre,
    color: couleurs.texte,
    marginBottom: espaces.s,
  },
  description: {
    fontFamily: polices.normale,
    fontSize: tailles.normale,
    lineHeight: 22,
    color: couleurs.texteSecondaire,
    textAlign: 'center',
    marginBottom: espaces.xl,
  },
  etiquette: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: espaces.m,
    paddingVertical: 6,
    borderRadius: rayons.rond,
    backgroundColor: couleurs.principaleClaire,
  },
  texteEtiquette: {
    fontFamily: polices.tresGrasse,
    fontSize: 13,
    color: couleurs.principaleFoncee,
  },
})

export default styles
