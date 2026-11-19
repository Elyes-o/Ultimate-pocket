import { StyleSheet } from 'react-native'
import { couleurs, espaces, rayons, polices, tailles, ombre, ESPACE_BARRE_NAVIGATION, RATIO_CARTE } from '../theme'

const styles = StyleSheet.create({
  contenu: {
    paddingHorizontal: espaces.l,
    paddingBottom: ESPACE_BARRE_NAVIGATION,
  },
  carteDeck: {
    backgroundColor: couleurs.surface,
    borderRadius: rayons.grand,
    padding: espaces.l,
    marginBottom: espaces.l,
    ...ombre,
  },
  ligneTitre: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: espaces.m,
  },
  titreCarte: {
    fontFamily: polices.titre,
    fontSize: tailles.moyenne,
    color: couleurs.texte,
  },
  boutonModifier: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: espaces.m,
    height: 32,
    borderRadius: rayons.rond,
    backgroundColor: couleurs.principaleClaire,
  },
  texteModifier: {
    fontFamily: polices.tresGrasse,
    fontSize: 13,
    color: couleurs.principaleFoncee,
  },
  rangeeCartes: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  miniCarte: {
    flex: 1,
    aspectRatio: RATIO_CARTE,
    borderRadius: 4,
    overflow: 'hidden',
  },
  imagePleine: {
    width: '100%',
    height: '100%',
  },
  separateur: {
    width: 2,
    height: 40,
    borderRadius: 1,
    backgroundColor: couleurs.bordure,
    marginHorizontal: 2,
  },
  aide: {
    fontFamily: polices.normale,
    fontSize: 13,
    color: couleurs.texteSecondaire,
  },
  titreSection: {
    fontFamily: polices.titre,
    fontSize: tailles.grande,
    color: couleurs.texte,
  },
  statistiques: {
    fontFamily: polices.tresGrasse,
    fontSize: 14,
    color: couleurs.texteSecondaire,
  },
  carteNiveau: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaces.m,
    padding: espaces.m,
    borderRadius: rayons.grand,
    backgroundColor: couleurs.surface,
    marginBottom: espaces.s,
  },
  carteNiveauGrisee: {
    opacity: 0.55,
  },
  pastilleNiveau: {
    width: 44,
    height: 44,
    borderRadius: rayons.moyen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numeroNiveau: {
    fontFamily: polices.titre,
    fontSize: tailles.grande,
    color: couleurs.texteInverse,
  },
  infosNiveau: {
    flex: 1,
  },
  nomNiveau: {
    fontFamily: polices.tresGrasse,
    fontSize: tailles.moyenne,
    color: couleurs.texte,
  },
  styleNiveau: {
    fontFamily: polices.normale,
    fontSize: 12,
    color: couleurs.texteSecondaire,
  },
  ligneRecompense: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  texteRecompense: {
    fontFamily: polices.grasse,
    fontSize: 13,
    color: couleurs.texteSecondaire,
  },
  texteBientot: {
    fontFamily: polices.grasse,
    fontSize: 12,
    color: couleurs.texteSecondaire,
  },
})

export default styles
