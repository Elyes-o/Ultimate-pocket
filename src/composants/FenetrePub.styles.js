import { StyleSheet } from 'react-native'
import { couleurs, espaces, rayons, polices, tailles } from '../theme'

const styles = StyleSheet.create({
  ecran: {
    flex: 1,
    padding: espaces.xl,
    paddingTop: 48,
  },
  haut: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  etiquette: {
    fontFamily: polices.tresGrasse,
    fontSize: 11,
    letterSpacing: 1.5,
    color: 'rgba(255,255,255,0.6)',
  },
  compteur: {
    width: 36,
    height: 36,
    borderRadius: rayons.rond,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texteCompteur: {
    fontFamily: polices.tresGrasse,
    fontSize: tailles.normale,
    color: couleurs.texteInverse,
  },
  boutonFermer: {
    width: 36,
    height: 36,
    borderRadius: rayons.rond,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centre: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titre: {
    fontFamily: polices.titre,
    fontSize: tailles.titre,
    color: couleurs.texteInverse,
    marginTop: espaces.l,
  },
  texte: {
    fontFamily: polices.normale,
    fontSize: tailles.normale,
    color: 'rgba(255,255,255,0.7)',
    marginTop: espaces.xs,
  },
  bas: {
    fontFamily: polices.grasse,
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: espaces.xl,
  },
})

export default styles
