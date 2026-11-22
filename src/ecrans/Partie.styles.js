import { StyleSheet } from 'react-native'
import { couleurs, espaces, rayons, polices, tailles, ombre, RATIO_CARTE, reliefBouton } from '../theme'

const styles = StyleSheet.create({
  ecran: {
    flex: 1,
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
  // Boss : PV de Ganondorf en haut, voile rouge en phase 2
  barreBoss: {
    flex: 1,
    marginHorizontal: espaces.m,
  },
  ligneBoss: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 4,
  },
  nomBoss: {
    flex: 1,
    fontFamily: polices.titre,
    fontSize: 15,
    color: couleurs.texte,
  },
  pvBoss: {
    fontFamily: polices.tresGrasse,
    fontSize: 13,
    color: couleurs.texteSecondaire,
  },
  fondPvBoss: {
    height: 10,
    borderRadius: rayons.rond,
    backgroundColor: couleurs.surfaceDouce,
    overflow: 'hidden',
  },
  pvBossPlein: {
    height: '100%',
    borderRadius: rayons.rond,
    backgroundColor: '#7B2FBE',
  },
  pvBossPhase2: {
    backgroundColor: couleurs.danger,
  },
  reperePhase2: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: '50%',
    width: 2,
    backgroundColor: couleurs.surface,
  },
  voilePhase2: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(240, 88, 74, 0.12)',
  },

  // Halo qui pulse autour de ta carte quand c'est ton tour (= « touche-moi »)
  halo: {
    position: 'absolute',
    top: -6,
    left: -6,
    right: -6,
    bottom: -6,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: couleurs.principale,
  },
  haloTutoriel: {
    borderColor: couleurs.ticket,
  },
  indicationCarte: {
    fontFamily: polices.tresGrasse,
    fontSize: 12,
    color: couleurs.principale,
    marginTop: 4,
  },
  // Élément montré par le tutoriel
  cibleTutoriel: {
    borderWidth: 3,
    borderColor: couleurs.ticket,
    borderRadius: rayons.moyen,
    opacity: 1,
  },
  texteTutoriel: {
    fontFamily: polices.grasse,
    fontSize: tailles.normale,
    color: couleurs.texteSecondaire,
    textAlign: 'center',
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
  boutonDesactive: {
    opacity: 0.4,
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
    ...reliefBouton,
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
