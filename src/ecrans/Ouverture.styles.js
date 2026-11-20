import { StyleSheet } from 'react-native'
import { couleurs, espaces, rayons, polices, tailles, RATIO_CARTE, reliefBouton } from '../theme'

const LARGEUR_CARTE = 240
const HAUTEUR_CARTE = LARGEUR_CARTE / RATIO_CARTE

const styles = StyleSheet.create({
  ecran: {
    flex: 1,
  },
  centre: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: espaces.xl,
  },
  boutonHaut: {
    position: 'absolute',
    top: 48,
    right: espaces.l,
    zIndex: 2,
    paddingHorizontal: espaces.l,
    paddingVertical: espaces.s,
    borderRadius: rayons.rond,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  texteBoutonHaut: {
    fontFamily: polices.grasse,
    fontSize: 14,
    color: couleurs.texteInverse,
  },

  // Étape 1 : le paquet
  nomBooster: {
    fontFamily: polices.titre,
    fontSize: tailles.titre,
    color: couleurs.texteInverse,
    marginTop: espaces.xxl,
  },
  consigne: {
    fontFamily: polices.grasse,
    fontSize: tailles.normale,
    color: 'rgba(255,255,255,0.65)',
    marginTop: espaces.l,
  },

  // Étape 2 : la révélation
  compteur: {
    fontFamily: polices.tresGrasse,
    fontSize: tailles.normale,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: espaces.xl,
    letterSpacing: 1,
  },
  zoneCarte: {
    width: LARGEUR_CARTE,
    height: HAUTEUR_CARTE + 40,
    alignItems: 'center',
  },
  carteDansLaPile: {
    position: 'absolute',
    top: 0,
  },
  carteRevelee: {
    position: 'absolute',
    top: 0,
    alignItems: 'center',
  },
  halo: {
    position: 'absolute',
    top: -18,
    left: -18,
    width: LARGEUR_CARTE + 36,
    height: HAUTEUR_CARTE + 36,
    borderRadius: 28,
    zIndex: 0, // derrière la carte
    backgroundColor: '#F7B731',
    shadowColor: '#F7B731',
    shadowOpacity: 1,
    shadowRadius: 30,
  },
  haloUltra: {
    backgroundColor: '#C77DFF',
    shadowColor: '#C77DFF',
  },
  cadreCarte: {
    zIndex: 1, // devant le halo
    width: LARGEUR_CARTE,
    height: HAUTEUR_CARTE,
    borderRadius: 14,
    overflow: 'hidden',
  },
  imagePleine: {
    width: '100%',
    height: '100%',
  },
  etiquettes: {
    position: 'absolute',
    zIndex: 2,
    top: -14,
    flexDirection: 'row',
    gap: espaces.s,
  },
  etiquette: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: rayons.rond,
  },
  etiquetteRare: {
    backgroundColor: '#FFD66B',
  },
  texteEtiquetteRare: {
    fontFamily: polices.titre,
    fontSize: 11,
    letterSpacing: 1,
    color: '#5A3B00',
  },
  etiquetteNouveau: {
    backgroundColor: couleurs.succes,
  },
  texteBadge: {
    fontFamily: polices.titre,
    fontSize: 10,
    letterSpacing: 1,
    color: couleurs.texteInverse,
  },

  // Étape 3 : le résumé
  titreResume: {
    fontFamily: polices.titre,
    fontSize: tailles.titre,
    color: couleurs.texteInverse,
  },
  sousTitreResume: {
    fontFamily: polices.grasse,
    fontSize: tailles.normale,
    color: 'rgba(255,255,255,0.75)',
    marginTop: espaces.xs,
    marginBottom: espaces.xl,
  },
  grilleResume: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: espaces.m,
    marginBottom: espaces.xxl,
  },
  caseResume: {
    alignItems: 'center',
  },
  carteResume: {
    width: 96,
    height: 96 / RATIO_CARTE,
    borderRadius: 8,
    overflow: 'hidden',
  },
  badgeNouveau: {
    position: 'absolute',
    bottom: -8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: rayons.rond,
    backgroundColor: couleurs.succes,
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
    marginBottom: espaces.m,
    ...reliefBouton,
  },
  texteBoutonPrincipal: {
    fontFamily: polices.tresGrasse,
    fontSize: tailles.moyenne,
    color: couleurs.texteInverse,
  },
  boutonSecondaire: {
    paddingVertical: espaces.s,
  },
  texteBoutonSecondaire: {
    fontFamily: polices.grasse,
    fontSize: tailles.normale,
    color: 'rgba(255,255,255,0.75)',
  },

  // Flash blanc par-dessus tout l'écran
  flash: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#FFFFFF',
  },
})

export default styles
