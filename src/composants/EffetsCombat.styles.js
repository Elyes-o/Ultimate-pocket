import { StyleSheet } from 'react-native'
import { couleurs, polices, rayons } from '../theme'

const styles = StyleSheet.create({
  // Dégâts qui s'envolent
  degats: {
    position: 'absolute',
    alignSelf: 'center',
    top: '25%',
    alignItems: 'center',
    zIndex: 5,
  },
  texteDegats: {
    fontFamily: polices.titre,
    fontSize: 40,
    color: '#E2483D',
    textShadowColor: '#FFFFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  badgeFaiblesse: {
    backgroundColor: '#F7B731',
    borderRadius: rayons.rond,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginTop: -4,
  },
  texteFaiblesse: {
    fontFamily: polices.titre,
    fontSize: 11,
    letterSpacing: 1,
    color: '#5A3B00',
  },

  // Carte mise KO
  carteKo: {
    position: 'absolute',
    top: 0,
    zIndex: 4,
  },
  cadreKo: {
    overflow: 'hidden',
  },
  imageKo: {
    width: '100%',
    height: '100%',
  },
  voileGris: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(40,44,60,0.6)',
  },
  tamponKo: {
    position: 'absolute',
    top: '35%',
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: '#E2483D',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    transform: [{ rotate: '-12deg' }],
  },
  texteTamponKo: {
    fontFamily: polices.titre,
    fontSize: 26,
    color: '#E2483D',
  },

  // Bandeau de tour
  bandeau: {
    alignSelf: 'center',
    paddingHorizontal: 18,
    paddingVertical: 5,
    borderRadius: rayons.rond,
  },
  bandeauJoueur: {
    backgroundColor: couleurs.principale,
  },
  bandeauBot: {
    backgroundColor: '#FDE2E0',
  },
  texteBandeau: {
    fontFamily: polices.titre,
    fontSize: 13,
    letterSpacing: 0.5,
  },
  texteBandeauJoueur: {
    color: couleurs.texteInverse,
  },
  texteBandeauBot: {
    color: '#B3261E',
  },
})

export default styles
