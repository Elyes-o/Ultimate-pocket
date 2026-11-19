import { StyleSheet } from 'react-native'
import { couleurs, espaces, rayons, polices, tailles } from '../theme'

const styles = StyleSheet.create({
  fondModal: {
    flex: 1,
    backgroundColor: 'rgba(10, 14, 30, 0.55)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  feuille: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: couleurs.surface,
    borderTopLeftRadius: rayons.enorme,
    borderTopRightRadius: rayons.enorme,
    padding: espaces.xl,
    paddingBottom: espaces.xxl,
    alignItems: 'center',
  },
  titreFeuille: {
    fontFamily: polices.titre,
    fontSize: tailles.grande,
    color: couleurs.texte,
    marginTop: espaces.l,
  },
  texteFeuille: {
    fontFamily: polices.normale,
    fontSize: tailles.normale,
    color: couleurs.texteSecondaire,
    marginTop: espaces.xs,
    marginBottom: espaces.xl,
  },
  boutonAcheter: {
    width: '100%',
    height: 54,
    borderRadius: rayons.moyen,
    backgroundColor: couleurs.principale,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: espaces.s,
  },
  boutonDesactive: {
    opacity: 0.4,
  },
  texteBoutonAcheter: {
    fontFamily: polices.tresGrasse,
    fontSize: tailles.moyenne,
    color: couleurs.texteInverse,
  },
  boutonAnnuler: {
    paddingVertical: espaces.m,
    marginTop: espaces.xs,
  },
  texteBoutonAnnuler: {
    fontFamily: polices.grasse,
    fontSize: tailles.normale,
    color: couleurs.texteSecondaire,
  },
})

export default styles
