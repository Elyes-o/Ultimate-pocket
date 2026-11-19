import { StyleSheet } from 'react-native'
import { couleurs, espaces, rayons, polices, tailles } from '../theme'

const styles = StyleSheet.create({
  carte: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaces.m,
    padding: espaces.m,
    borderRadius: rayons.grand,
    backgroundColor: couleurs.surface,
    marginBottom: espaces.s,
  },
  carteVerrouillee: {
    opacity: 0.6,
  },
  infos: {
    flex: 1,
  },
  nom: {
    fontFamily: polices.tresGrasse,
    fontSize: tailles.moyenne,
    color: couleurs.texte,
  },
  univers: {
    fontFamily: polices.normale,
    fontSize: 13,
    color: couleurs.texteSecondaire,
  },
  prix: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: espaces.m,
    height: 34,
    borderRadius: rayons.rond,
    backgroundColor: couleurs.principaleClaire,
  },
  textePrix: {
    fontFamily: polices.tresGrasse,
    fontSize: tailles.normale,
    color: couleurs.principaleFoncee,
  },
  bientot: {
    paddingHorizontal: espaces.m,
    height: 30,
    justifyContent: 'center',
    borderRadius: rayons.rond,
    backgroundColor: couleurs.surfaceDouce,
  },
  texteBientot: {
    fontFamily: polices.grasse,
    fontSize: 12,
    color: couleurs.texteSecondaire,
  },

  // Fenêtre de confirmation d'achat
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
