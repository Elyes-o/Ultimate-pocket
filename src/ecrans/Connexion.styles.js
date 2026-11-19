import { StyleSheet } from 'react-native'
import { couleurs, espaces, rayons, polices, tailles, ombre, RATIO_CARTE } from '../theme'

const LARGEUR_CARTE = 130

const styles = StyleSheet.create({
  ecran: {
    flex: 1,
    backgroundColor: couleurs.fond,
  },

  // Partie haute : les cartes en éventail
  haut: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: espaces.xl,
  },
  eventail: {
    width: LARGEUR_CARTE * 2.4,
    height: LARGEUR_CARTE / RATIO_CARTE + 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carte: {
    position: 'absolute',
    width: LARGEUR_CARTE,
    height: LARGEUR_CARTE / RATIO_CARTE,
    borderRadius: rayons.petit,
    ...ombre,
  },
  carteGauche: {
    transform: [{ translateX: -78 }, { translateY: 14 }, { rotate: '-12deg' }],
  },
  carteDroite: {
    transform: [{ translateX: 78 }, { translateY: 14 }, { rotate: '12deg' }],
  },
  carteCentre: {
    transform: [{ scale: 1.08 }],
  },

  // Partie basse : logo et boutons
  bas: {
    paddingHorizontal: espaces.xl,
    paddingBottom: espaces.xxl,
    alignItems: 'center',
  },
  slogan: {
    fontFamily: polices.normale,
    fontSize: tailles.normale,
    color: couleurs.texteSecondaire,
    marginTop: espaces.xs,
    marginBottom: espaces.xl,
  },
  bouton: {
    width: '100%',
    height: 54,
    borderRadius: rayons.moyen,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: espaces.s,
    marginBottom: espaces.m,
  },
  boutonApple: {
    backgroundColor: '#000000',
  },
  boutonGoogle: {
    backgroundColor: couleurs.surface,
    borderWidth: 1,
    borderColor: couleurs.bordure,
  },
  texteBouton: {
    fontFamily: polices.grasse,
    fontSize: tailles.moyenne,
    color: couleurs.texte,
  },
  texteBoutonApple: {
    color: '#FFFFFF',
  },
  lienInvite: {
    fontFamily: polices.tresGrasse,
    fontSize: tailles.normale,
    color: couleurs.principale,
    paddingVertical: espaces.s,
  },
  mentions: {
    fontFamily: polices.normale,
    fontSize: 11,
    color: couleurs.texteSecondaire,
    textAlign: 'center',
    marginTop: espaces.m,
  },
})

export default styles
