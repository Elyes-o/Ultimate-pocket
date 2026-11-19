import { StyleSheet } from 'react-native'
import { couleurs, espaces, rayons, polices, tailles, ombre } from '../theme'

const styles = StyleSheet.create({
  carte: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaces.l,
    marginHorizontal: espaces.l,
    padding: espaces.l,
    borderRadius: rayons.grand,
    backgroundColor: couleurs.surface,
    borderWidth: 2,
    borderColor: 'transparent',
    ...ombre,
  },
  cartePrete: {
    borderColor: couleurs.succes,
  },
  infos: {
    flex: 1,
  },
  titre: {
    fontFamily: polices.tresGrasse,
    fontSize: tailles.moyenne,
    color: couleurs.texte,
  },
  etiquetteGratuit: {
    alignSelf: 'flex-start',
    marginBottom: 2,
    backgroundColor: '#E3F7EE',
    borderRadius: rayons.rond,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  texteGratuit: {
    fontFamily: polices.tresGrasse,
    fontSize: 10,
    letterSpacing: 0.8,
    color: couleurs.succes,
  },
  sousTitre: {
    fontFamily: polices.normale,
    fontSize: 13,
    color: couleurs.texteSecondaire,
    marginTop: 2,
  },
  minuteur: {
    fontFamily: polices.titre,
    fontSize: tailles.grande,
    color: couleurs.texte,
    fontVariant: ['tabular-nums'],
  },
  barreFond: {
    height: 6,
    borderRadius: rayons.rond,
    backgroundColor: couleurs.surfaceDouce,
    overflow: 'hidden',
    marginTop: espaces.s,
    marginBottom: espaces.m,
  },
  barrePleine: {
    height: '100%',
    borderRadius: rayons.rond,
    backgroundColor: couleurs.principale,
  },
  barrePrete: {
    backgroundColor: couleurs.succes,
  },
  bouton: {
    height: 38,
    borderRadius: rayons.rond,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  boutonTicket: {
    backgroundColor: '#FFF4E0',
  },
  texteBoutonTicket: {
    fontFamily: polices.tresGrasse,
    fontSize: 13,
    color: '#B5700A',
  },
  boutonDesactive: {
    opacity: 0.45,
  },
  boutonOuvrir: {
    backgroundColor: couleurs.succes,
  },
  texteBoutonOuvrir: {
    fontFamily: polices.tresGrasse,
    fontSize: tailles.normale,
    color: couleurs.texteInverse,
  },
})

export default styles
