import { StyleSheet } from 'react-native'
import { couleurs, espaces, rayons, polices, tailles, ESPACE_BARRE_NAVIGATION, RATIO_CARTE } from '../theme'

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

  // Carte agrandie
  fondModal: {
    flex: 1,
    backgroundColor: 'rgba(10, 14, 30, 0.82)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: espaces.xl,
  },
  carteAgrandie: {
    width: 300,
    maxWidth: '90%',
    aspectRatio: RATIO_CARTE,
    borderRadius: 14,
    overflow: 'hidden',
  },
  imagePleine: {
    width: '100%',
    height: '100%',
  },
  nomCarteAgrandie: {
    fontFamily: polices.titre,
    fontSize: tailles.grande,
    color: couleurs.texteInverse,
    marginTop: espaces.l,
  },
  indication: {
    fontFamily: polices.normale,
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    marginTop: espaces.xs,
  },
})

export default styles
