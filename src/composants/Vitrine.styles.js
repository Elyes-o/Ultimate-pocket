import { StyleSheet } from 'react-native'
import { couleurs, espaces, rayons, polices, tailles, RATIO_CARTE } from '../theme'

const HAUTEUR_DIAPOSITIVE = 200
const LARGEUR_CARTE = 92
const HAUTEUR_CARTE = LARGEUR_CARTE / RATIO_CARTE

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: espaces.l,
  },
  diapositive: {
    height: HAUTEUR_DIAPOSITIVE,
    borderRadius: rayons.enorme,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  fond: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  textes: {
    flex: 1,
    padding: espaces.xl,
    paddingRight: 0,
    justifyContent: 'center',
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderRadius: rayons.rond,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: espaces.s,
  },
  texteBadge: {
    fontFamily: polices.tresGrasse,
    fontSize: 10,
    color: couleurs.texteInverse,
  },
  titre: {
    fontFamily: polices.titre,
    fontSize: tailles.grande,
    lineHeight: 26,
    color: couleurs.texteInverse,
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  sousTitre: {
    fontFamily: polices.normale,
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginTop: espaces.xs,
  },

  // Cartes à droite de la diapositive
  zoneCartes: {
    width: 150,
    marginRight: espaces.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carte: {
    position: 'absolute',
    width: LARGEUR_CARTE,
    height: HAUTEUR_CARTE,
    borderRadius: 6,
  },
  carteSeule: {
    width: LARGEUR_CARTE * 1.15,
    height: HAUTEUR_CARTE * 1.15,
    transform: [{ rotate: '8deg' }, { translateY: 14 }],
  },
  carteArriereGauche: {
    transform: [{ translateX: -24 }, { translateY: 18 }, { rotate: '-12deg' }],
  },
  carteArriereDroite: {
    transform: [{ translateX: 24 }, { translateY: 18 }, { rotate: '12deg' }],
  },
  carteDevant: {
    transform: [{ translateY: 10 }],
  },

  // Petits points sous la vitrine
  points: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: espaces.m,
  },
  point: {
    width: 6,
    height: 6,
    borderRadius: rayons.rond,
    backgroundColor: '#C9CFDD',
  },
  pointActif: {
    width: 20,
    backgroundColor: couleurs.principale,
  },
})

export default styles
