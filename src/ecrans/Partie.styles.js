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
  // Plateau : image d'arène en fond (ovale violet en haut, cyan en bas)
  imageArene: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  arene: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 2,
  },
  ligneBot: {
    width: '100%',
    alignItems: 'center',
  },
  jaugeBot: {
    position: 'absolute',
    left: espaces.m,
    top: 0,
  },
  // Étiquettes des camps, penchées comme des onglets (coin haut droit / bas gauche)
  etiquetteAdversaire: {
    position: 'absolute',
    right: -6,
    top: -30,
    maxWidth: 110,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    backgroundColor: '#2A2470',
    transform: [{ skewX: '-12deg' }],
  },
  etiquetteJoueur: {
    position: 'absolute',
    left: -6,
    top: -14,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: couleurs.principaleFoncee,
    transform: [{ skewX: '-12deg' }],
  },
  texteEtiquetteCamp: {
    fontFamily: polices.tresGrasse,
    fontSize: 12,
    color: couleurs.texteInverse,
  },
  banc: {
    flexDirection: 'row',
    gap: 8,
  },
  placeVide: {
    marginTop: 20, // la hauteur du nombre de PV au-dessus des cartes
    borderRadius: 6,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'rgba(255,255,255,0.9)',
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  placeActive: {
    alignItems: 'center',
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
  // Nom et type, à droite de la carte active (la carte reste bien au centre)
  etiquetteActif: {
    position: 'absolute',
    left: '50%',
    marginLeft: 100 / 2 + 10,
    top: 40,
    width: 110,
  },
  texteADroite: {
    textAlign: 'right',
  },
  // Ta carte : le texte passe à GAUCHE (ta jauge d'Énergie est à droite)
  etiquetteActifGauche: {
    marginLeft: -(100 / 2 + 10 + 110),
    alignItems: 'flex-end',
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
  // Ce qui vient de se passer, dans une pastille au milieu du plateau
  message: {
    maxWidth: 300,
    fontFamily: polices.grasse,
    fontSize: 13,
    color: couleurs.texte,
    textAlign: 'center',
    paddingHorizontal: espaces.m,
    paddingVertical: 4,
    borderRadius: rayons.moyen,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },

  // Bas de l'écran : main, étiquette, actions
  jaugeJoueur: {
    position: 'absolute',
    right: espaces.m,
    bottom: 6,
  },
  zoneBas: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: espaces.l,
    paddingTop: espaces.m,
  },
  main: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginLeft: 4,
  },
  carteMain: {
    marginRight: -10, // les cartes se chevauchent un peu, comme dans une main
    alignItems: 'center',
  },
  cadreMain: {
    width: 64,
    height: 64 / RATIO_CARTE,
    borderRadius: 6,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: couleurs.surface,
    ...ombre,
  },
  carteMainEteinte: {
    opacity: 0.45,
  },
  carteMainEnAvant: {
    transform: [{ translateY: -10 }, { scale: 1.08 }],
  },
  imagePleine: {
    width: '100%',
    height: '100%',
  },
  texteUtilise: {
    position: 'absolute',
    bottom: 30,
    fontFamily: polices.tresGrasse,
    fontSize: 11,
    color: couleurs.texteInverse,
    backgroundColor: 'rgba(27, 43, 72, 0.8)',
    paddingHorizontal: 6,
    borderRadius: 6,
    overflow: 'hidden',
  },
  actionsDroite: {
    flex: 1,
    alignItems: 'flex-end',
    gap: 8,
    marginLeft: espaces.l,
  },
  pastilleAttente: {
    paddingHorizontal: espaces.l,
    paddingVertical: espaces.m,
    borderRadius: rayons.rond,
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
  texteAttente: {
    fontFamily: polices.tresGrasse,
    fontSize: 13,
    color: couleurs.texteSecondaire,
  },
  boutonConcentrer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    minHeight: 48,
    paddingHorizontal: espaces.l,
    borderRadius: rayons.rond,
    backgroundColor: couleurs.surface,
    borderWidth: 2,
    borderColor: couleurs.principaleClaire,
    ...ombre,
  },
  texteConcentrer: {
    fontFamily: polices.tresGrasse,
    fontSize: 14,
    color: couleurs.principaleFoncee,
  },
  detailConcentrer: {
    fontFamily: polices.grasse,
    fontSize: 11,
    color: couleurs.texteSecondaire,
  },
  boutonUltime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    minHeight: 44,
    maxWidth: 230,
    paddingHorizontal: espaces.m,
    borderRadius: rayons.rond,
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
  boutonDesactive: {
    opacity: 0.4,
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
