import { StyleSheet } from 'react-native'
import { couleurs, espaces, rayons, polices, tailles, ombre, RATIO_CARTE } from '../theme'

const styles = StyleSheet.create({
  ecran: {
    flex: 1,
  },

  // Barre du haut
  barreHaut: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: espaces.l,
    marginBottom: espaces.s,
  },
  boutonQuitter: {
    width: 36,
    height: 36,
    borderRadius: rayons.rond,
    backgroundColor: couleurs.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titreBarre: {
    fontFamily: polices.titre,
    fontSize: tailles.moyenne,
    color: couleurs.texte,
  },
  tour: {
    fontFamily: polices.tresGrasse,
    fontSize: 13,
    color: couleurs.texteSecondaire,
    width: 56,
    textAlign: 'right',
  },

  // Une moitié du terrain
  zoneCamp: {
    flexDirection: 'row',
    gap: espaces.m,
    marginHorizontal: espaces.l,
    padding: espaces.s,
    borderRadius: rayons.grand,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  zoneCampJoueur: {
    borderWidth: 2,
    borderColor: couleurs.principaleClaire,
  },
  colonneInfos: {
    flex: 1,
    gap: 6,
  },
  ligneNom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nomCamp: {
    flex: 1,
    fontFamily: polices.titre,
    fontSize: tailles.moyenne,
    color: couleurs.texte,
  },
  sousNom: {
    fontFamily: polices.grasse,
    fontSize: 12,
    color: couleurs.texteSecondaire,
    marginTop: -6,
  },
  pastillesKo: {
    flexDirection: 'row',
    gap: 3,
  },
  pastilleKo: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#E2483D',
  },
  pastilleKoPleine: {
    backgroundColor: '#E2483D',
  },
  banc: {
    flexDirection: 'row',
    gap: 6,
  },

  // Message du milieu
  milieu: {
    flex: 1,
    minHeight: 30,
    justifyContent: 'center',
    paddingHorizontal: espaces.xl,
  },
  message: {
    fontFamily: polices.grasse,
    fontSize: 14,
    color: couleurs.texte,
    textAlign: 'center',
  },

  // Panneau d'actions
  panneau: {
    marginTop: espaces.s,
    paddingHorizontal: espaces.l,
    paddingTop: espaces.m,
    gap: 6,
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
    height: 40,
    paddingHorizontal: espaces.l,
    borderRadius: rayons.moyen,
  },
  texteUltime: {
    flex: 1,
    fontFamily: polices.titre,
    fontSize: 14,
    color: '#FFFFFF',
  },
  coutUltime: {
    fontFamily: polices.titre,
    fontSize: 14,
    color: '#FFFFFF',
  },
  boutonAttaque: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaces.m,
    minHeight: 42,
    paddingHorizontal: espaces.m,
    borderRadius: rayons.moyen,
    backgroundColor: couleurs.principaleClaire,
  },
  boutonDesactive: {
    opacity: 0.4,
  },
  cout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 1,
    paddingHorizontal: 8,
    height: 26,
    borderRadius: rayons.rond,
    backgroundColor: '#F5A524',
  },
  texteCout: {
    fontFamily: polices.titre,
    fontSize: 14,
    color: '#FFFFFF',
  },
  infosAttaque: {
    flex: 1,
    paddingVertical: 4,
  },
  nomAttaque: {
    fontFamily: polices.tresGrasse,
    fontSize: 15,
    color: couleurs.texte,
  },
  effetsAttaque: {
    fontFamily: polices.normale,
    fontSize: 11,
    color: couleurs.texteSecondaire,
  },
  degatsAttaque: {
    fontFamily: polices.titre,
    fontSize: tailles.grande,
    color: couleurs.principaleFoncee,
  },
  rangeeActions: {
    flexDirection: 'row',
    gap: espaces.s,
  },
  petiteAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    height: 44,
    minWidth: 52,
    paddingHorizontal: espaces.s,
    borderRadius: rayons.moyen,
    backgroundColor: couleurs.fond,
  },
  textePetiteAction: {
    fontFamily: polices.titre,
    fontSize: 14,
    color: couleurs.principale,
  },
  actionCarte: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  vignette: {
    width: 26,
    height: 26 / RATIO_CARTE,
    borderRadius: 3,
  },
  texteCarteAction: {
    flex: 1,
    fontFamily: polices.grasse,
    fontSize: 10,
    color: couleurs.texte,
  },
  boutonTalent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: espaces.m,
    paddingVertical: espaces.s,
    borderRadius: rayons.moyen,
    backgroundColor: couleurs.principaleClaire,
  },
  texteTalent: {
    flex: 1,
    fontFamily: polices.grasse,
    fontSize: 12,
    color: couleurs.principaleFoncee,
  },

  // Fenêtres (choix du banc, résultat)
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
  titreFeuille: {
    fontFamily: polices.titre,
    fontSize: tailles.moyenne,
    color: couleurs.texte,
    marginBottom: espaces.l,
    textAlign: 'center',
  },
  choixBanc: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: espaces.m,
  },
  boutonAnnuler: {
    paddingVertical: espaces.m,
    marginTop: espaces.s,
  },
  texteAnnuler: {
    fontFamily: polices.grasse,
    fontSize: tailles.normale,
    color: couleurs.texteSecondaire,
  },
  feuilleResultat: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: couleurs.surface,
    borderRadius: rayons.enorme,
    padding: espaces.xl,
    alignItems: 'center',
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
  boutonRejouer: {
    width: '100%',
    height: 52,
    borderRadius: rayons.moyen,
    backgroundColor: couleurs.principale,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texteRejouer: {
    fontFamily: polices.tresGrasse,
    fontSize: tailles.moyenne,
    color: couleurs.texteInverse,
  },
})

export default styles
