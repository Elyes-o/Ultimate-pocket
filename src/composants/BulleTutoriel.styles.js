import { StyleSheet } from 'react-native'
import { couleurs, espaces, rayons, polices, ombre, reliefBouton } from '../theme'

const TAILLE_PORTRAIT = 52

const styles = StyleSheet.create({
  bulle: {
    position: 'absolute',
    left: espaces.m,
    right: espaces.m,
    zIndex: 20,
    flexDirection: 'row',
    gap: espaces.m,
    padding: espaces.m,
    borderRadius: rayons.grand,
    backgroundColor: '#141A2E',
    borderWidth: 2,
    borderColor: couleurs.ticket,
    ...ombre,
  },
  portrait: {
    width: TAILLE_PORTRAIT,
    height: TAILLE_PORTRAIT,
    borderRadius: TAILLE_PORTRAIT / 2,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: couleurs.ticket,
    backgroundColor: '#2A3150',
  },
  // On agrandit la carte pour ne garder que le visage dans le rond
  imagePortrait: {
    position: 'absolute',
    width: TAILLE_PORTRAIT * 2.2,
    height: TAILLE_PORTRAIT * 3.1,
    left: -TAILLE_PORTRAIT * 0.6,
    top: -TAILLE_PORTRAIT * 0.55,
  },
  contenu: {
    flex: 1,
  },
  ligneTitre: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nomGuide: {
    fontFamily: polices.titre,
    fontSize: 14,
    color: couleurs.ticket,
  },
  progression: {
    fontFamily: polices.grasse,
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
  },
  texte: {
    fontFamily: polices.grasse,
    fontSize: 14,
    lineHeight: 19,
    color: couleurs.texteInverse,
    marginTop: 2,
  },
  boutonSuivant: {
    alignSelf: 'flex-end',
    height: 36,
    paddingHorizontal: espaces.l,
    marginTop: espaces.s,
    borderRadius: rayons.rond,
    backgroundColor: couleurs.ticket,
    justifyContent: 'center',
    ...reliefBouton,
  },
  texteSuivant: {
    fontFamily: polices.tresGrasse,
    fontSize: 14,
    color: '#141A2E',
  },
})

export default styles
