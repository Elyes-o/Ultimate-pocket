import { StyleSheet } from 'react-native'
import { couleurs, espaces, rayons, polices, tailles, ombre, RATIO_CARTE } from '../theme'

const styles = StyleSheet.create({
  ecran: {
    flex: 1,
    backgroundColor: '#EEF0F8',
  },

  // Score et tour
  barreHaut: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: espaces.l,
  },
  boutonQuitter: {
    width: 34,
    height: 34,
    borderRadius: rayons.rond,
    backgroundColor: couleurs.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  score: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaces.s,
  },
  nomScore: {
    fontFamily: polices.tresGrasse,
    fontSize: 13,
    color: couleurs.texteSecondaire,
  },
  chiffreScore: {
    fontFamily: polices.titre,
    fontSize: tailles.grande,
    color: couleurs.texte,
  },
  tour: {
    fontFamily: polices.tresGrasse,
    fontSize: 12,
    color: couleurs.texteSecondaire,
    width: 50,
    textAlign: 'right',
  },
  regleScore: {
    fontFamily: polices.normale,
    fontSize: 11,
    color: couleurs.texteSecondaire,
    textAlign: 'center',
    marginBottom: 4,
  },

  // Arène
  arene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 6,
    paddingBottom: 6,
  },
  ligneBot: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaces.m,
  },
  energieBot: {
    width: 96,
  },
  banc: {
    flexDirection: 'row',
    gap: 6,
    minHeight: 66,
  },
  placeActive: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaces.m,
  },
  etiquetteActif: {
    width: 120,
  },
  nomActif: {
    fontFamily: polices.titre,
    fontSize: tailles.moyenne,
    color: couleurs.texte,
  },
  typeActif: {
    fontFamily: polices.grasse,
    fontSize: 11,
    color: couleurs.texteSecondaire,
  },
  message: {
    fontFamily: polices.grasse,
    fontSize: 13,
    color: couleurs.texte,
    textAlign: 'center',
    paddingHorizontal: espaces.xl,
  },

  // Panneau d'actions
  panneau: {
    paddingHorizontal: espaces.l,
    paddingTop: espaces.m,
    gap: 8,
    backgroundColor: couleurs.surface,
    borderTopLeftRadius: rayons.enorme,
    borderTopRightRadius: rayons.enorme,
    ...ombre,
  },
  attente: {
    fontFamily: polices.tresGrasse,
    fontSize: tailles.normale,
    color: couleurs.texteSecondaire,
    textAlign: 'center',
    paddingVertical: espaces.xl,
  },
  boutonUltime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaces.s,
    minHeight: 44,
    paddingHorizontal: espaces.m,
    borderRadius: rayons.moyen,
  },
  ultimePret: {
    backgroundColor: '#F5A524',
  },
  ultimeEnCharge: {
    backgroundColor: '#FFF4E0',
  },
  infosUltime: {
    flex: 1,
  },
  texteUltime: {
    fontFamily: polices.titre,
    fontSize: 14,
    color: '#FFFFFF',
  },
  detailUltime: {
    fontFamily: polices.grasse,
    fontSize: 11,
    color: '#FFFFFF',
  },
  texteUltimeEnCharge: {
    color: '#8A5A08',
  },
  coutUltime: {
    fontFamily: polices.titre,
    fontSize: 14,
    color: '#FFFFFF',
  },
  grilleAttaques: {
    flexDirection: 'row',
    gap: 8,
  },
  boutonAttaque: {
    flex: 1,
    padding: 8,
    borderRadius: rayons.moyen,
    backgroundColor: couleurs.principaleClaire,
    borderWidth: 1.5,
    borderColor: '#D6D1FF',
    gap: 2,
  },
  boutonDesactive: {
    opacity: 0.4,
  },
  ligneAttaque: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nomAttaque: {
    flex: 1,
    fontFamily: polices.tresGrasse,
    fontSize: 13,
    color: couleurs.texte,
  },
  cout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
    paddingHorizontal: 7,
    height: 22,
    borderRadius: rayons.rond,
    backgroundColor: '#F5A524',
  },
  texteCout: {
    fontFamily: polices.titre,
    fontSize: 13,
    color: '#FFFFFF',
  },
  degatsAttaque: {
    fontFamily: polices.titre,
    fontSize: tailles.grande,
    color: couleurs.principaleFoncee,
  },
  effetsAttaque: {
    fontFamily: polices.normale,
    fontSize: 10,
    color: couleurs.texteSecondaire,
  },
  rangeeActions: {
    flexDirection: 'row',
    gap: 6,
  },
  petiteAction: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 2,
    borderRadius: rayons.moyen,
    backgroundColor: couleurs.fond,
  },
  textePetiteAction: {
    fontFamily: polices.tresGrasse,
    fontSize: 11,
    color: couleurs.texte,
    marginTop: 2,
  },
  detailPetiteAction: {
    fontFamily: polices.grasse,
    fontSize: 10,
    color: couleurs.texteSecondaire,
  },
  vignette: {
    width: 14,
    height: 14 / RATIO_CARTE,
    borderRadius: 2,
  },
  boutonTalent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: espaces.m,
    paddingVertical: 7,
    borderRadius: rayons.moyen,
    backgroundColor: couleurs.principaleClaire,
  },
  texteTalent: {
    flex: 1,
    fontFamily: polices.grasse,
    fontSize: 12,
    color: couleurs.principaleFoncee,
  },

  // Fenêtres (fiche de carte, choix du banc, résultat)
  fondModal: {
    flex: 1,
    backgroundColor: 'rgba(10, 14, 30, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: espaces.xl,
  },
  feuille: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: couleurs.surface,
    borderRadius: rayons.enorme,
    padding: espaces.xl,
    alignItems: 'center',
  },
  imageFiche: {
    width: 150,
    height: 150 / RATIO_CARTE,
    borderRadius: 10,
    marginBottom: espaces.m,
  },
  titreFeuille: {
    fontFamily: polices.titre,
    fontSize: tailles.moyenne,
    color: couleurs.texte,
    marginBottom: espaces.s,
    textAlign: 'center',
  },
  texteFiche: {
    fontFamily: polices.grasse,
    fontSize: tailles.normale,
    color: couleurs.texte,
    textAlign: 'center',
  },
  regleFiche: {
    fontFamily: polices.normale,
    fontSize: 12,
    color: couleurs.texteSecondaire,
    textAlign: 'center',
    marginTop: espaces.xs,
    marginBottom: espaces.l,
  },
  choixBanc: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: espaces.m,
    marginTop: espaces.s,
  },
  boutonPrincipal: {
    width: '100%',
    height: 50,
    borderRadius: rayons.moyen,
    backgroundColor: couleurs.principale,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texteBoutonPrincipal: {
    fontFamily: polices.tresGrasse,
    fontSize: tailles.moyenne,
    color: couleurs.texteInverse,
  },
  boutonAnnuler: {
    paddingVertical: espaces.m,
    marginTop: espaces.xs,
  },
  texteAnnuler: {
    fontFamily: polices.grasse,
    fontSize: tailles.normale,
    color: couleurs.texteSecondaire,
  },
  titreResultat: {
    fontFamily: polices.titre,
    fontSize: tailles.titre,
    color: couleurs.texte,
    marginTop: espaces.s,
  },
  recompenses: {
    gap: espaces.s,
    marginVertical: espaces.l,
  },
  ligneRecompense: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaces.s,
  },
  texteRecompense: {
    fontFamily: polices.tresGrasse,
    fontSize: tailles.moyenne,
    color: couleurs.texte,
  },
})

export default styles
