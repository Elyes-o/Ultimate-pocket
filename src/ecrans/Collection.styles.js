import { StyleSheet } from 'react-native'
import { couleurs, espaces, rayons, polices, tailles, ESPACE_BARRE_NAVIGATION, reliefBouton } from '../theme'

const styles = StyleSheet.create({
  ecran: {
    flex: 1,
  },
  contenu: {
    paddingHorizontal: espaces.l,
    paddingBottom: ESPACE_BARRE_NAVIGATION,
  },
  ligneGrille: {
    gap: espaces.m,
    marginBottom: espaces.s,
  },

  // Choix de l'univers (onglets en haut, comme Pokémon TCG Pocket)
  listeUnivers: {
    flexDirection: 'row',
    gap: espaces.s,
    marginBottom: espaces.l,
  },
  pastilleUnivers: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    height: 36,
    paddingHorizontal: espaces.l,
    borderRadius: rayons.rond,
    backgroundColor: couleurs.surfaceDouce,
  },
  pastilleActive: {
    backgroundColor: couleurs.zelda,
  },
  texteUnivers: {
    fontFamily: polices.grasse,
    fontSize: 14,
    color: couleurs.texteSecondaire,
  },
  texteUniversActif: {
    color: couleurs.texteInverse,
  },

  // Compteur "9 / 23" et barre de progression
  progression: {
    backgroundColor: couleurs.surface,
    borderRadius: rayons.grand,
    padding: espaces.l,
    marginBottom: espaces.l,
  },
  ligneProgression: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: espaces.s,
  },
  nomCollection: {
    fontFamily: polices.tresGrasse,
    fontSize: tailles.moyenne,
    color: couleurs.texte,
  },
  compteur: {
    fontFamily: polices.grasse,
    fontSize: tailles.normale,
    color: couleurs.texteSecondaire,
  },
  compteurFort: {
    fontFamily: polices.titre,
    fontSize: tailles.grande,
    color: couleurs.zelda,
  },
  barreFond: {
    height: 8,
    borderRadius: rayons.rond,
    backgroundColor: couleurs.surfaceDouce,
    overflow: 'hidden',
  },
  barrePleine: {
    height: '100%',
    borderRadius: rayons.rond,
    backgroundColor: couleurs.zelda,
  },

  repere: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 2,
    marginLeft: -1,
    backgroundColor: couleurs.surface,
  },

  // Paliers de récompenses (25, 50, 75, 100 %)
  listePaliers: {
    flexDirection: 'row',
    gap: espaces.s,
    marginTop: espaces.m,
  },
  palier: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
    paddingVertical: espaces.s,
    borderRadius: rayons.moyen,
    backgroundColor: couleurs.surfaceDouce,
  },
  palierPret: {
    backgroundColor: couleurs.ticket,
  },
  palierReclame: {
    backgroundColor: '#E3F6EC',
  },
  textePalier: {
    fontFamily: polices.titre,
    fontSize: 14,
    color: couleurs.texte,
  },
  detailPalier: {
    fontFamily: polices.grasse,
    fontSize: 11,
    color: couleurs.texteSecondaire,
  },
  textePalierPret: {
    color: couleurs.texteInverse,
  },

  // Doublons à recycler
  doublons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaces.m,
    backgroundColor: couleurs.principaleClaire,
    borderRadius: rayons.grand,
    padding: espaces.l,
    marginBottom: espaces.l,
  },
  texteDoublons: {
    flex: 1,
  },
  titreDoublons: {
    fontFamily: polices.tresGrasse,
    fontSize: tailles.normale,
    color: couleurs.principaleFoncee,
  },
  detailDoublons: {
    fontFamily: polices.normale,
    fontSize: 12,
    color: couleurs.texteSecondaire,
    marginTop: 2,
  },
  boutonRecycler: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    height: 44,
    paddingHorizontal: espaces.l,
    borderRadius: rayons.rond,
    backgroundColor: couleurs.principale,
    ...reliefBouton,
  },
  texteBoutonRecycler: {
    fontFamily: polices.titre,
    fontSize: 15,
    color: couleurs.texteInverse,
  },

  // Filtres
  segments: {
    flexDirection: 'row',
    padding: 4,
    borderRadius: rayons.rond,
    backgroundColor: couleurs.surfaceDouce,
    marginBottom: espaces.s,
  },
  segment: {
    flex: 1,
    height: 36,
    borderRadius: rayons.rond,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentActif: {
    backgroundColor: couleurs.surface,
  },
  texteSegment: {
    fontFamily: polices.grasse,
    fontSize: 14,
    color: couleurs.texteSecondaire,
  },
  texteSegmentActif: {
    color: couleurs.texte,
  },
  listeFiltres: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaces.s,
    paddingBottom: espaces.l,
  },
  filtre: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    height: 36,
    paddingHorizontal: 14,
    borderRadius: rayons.rond,
    backgroundColor: couleurs.surface,
    borderWidth: 1,
    borderColor: couleurs.bordure,
  },
  filtreActif: {
    backgroundColor: couleurs.principale,
    borderColor: couleurs.principale,
  },
  texteFiltre: {
    fontFamily: polices.grasse,
    fontSize: 14,
    color: couleurs.texte,
  },
  texteFiltreActif: {
    color: couleurs.texteInverse,
  },
  separateurFiltres: {
    width: 1,
    height: 20,
    backgroundColor: couleurs.bordure,
  },
  ligneResultats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -espaces.s,
    marginBottom: espaces.m,
  },
  texteResultats: {
    fontFamily: polices.grasse,
    fontSize: 13,
    color: couleurs.texteSecondaire,
  },
  lienReinitialiser: {
    fontFamily: polices.tresGrasse,
    fontSize: 13,
    color: couleurs.principale,
  },
  vide: {
    alignItems: 'center',
    gap: espaces.s,
    paddingVertical: espaces.xxl,
  },
  texteVide: {
    fontFamily: polices.grasse,
    fontSize: tailles.normale,
    color: couleurs.texteSecondaire,
  },

  // Fenêtres (récompense d'un palier, confirmation du recyclage)
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
  iconeCadeau: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: couleurs.ticket,
  },
  titreFeuille: {
    fontFamily: polices.titre,
    fontSize: tailles.grande,
    color: couleurs.texte,
    marginTop: espaces.l,
    textAlign: 'center',
  },
  texteFeuille: {
    fontFamily: polices.normale,
    fontSize: tailles.normale,
    color: couleurs.texteSecondaire,
    marginTop: espaces.xs,
    marginBottom: espaces.xl,
    textAlign: 'center',
  },
  ligneGains: {
    flexDirection: 'row',
    gap: espaces.l,
    marginTop: espaces.m,
    marginBottom: espaces.l,
  },
  gain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: espaces.l,
    height: 44,
    borderRadius: rayons.rond,
    backgroundColor: couleurs.fond,
  },
  texteGain: {
    fontFamily: polices.titre,
    fontSize: tailles.moyenne,
    color: couleurs.texte,
  },
  boutonPrincipal: {
    width: '100%',
    height: 54,
    borderRadius: rayons.moyen,
    backgroundColor: couleurs.principale,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: espaces.s,
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
  texteBoutonAnnuler: {
    fontFamily: polices.grasse,
    fontSize: tailles.normale,
    color: couleurs.texteSecondaire,
  },
})

export default styles
