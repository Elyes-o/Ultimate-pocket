import { StyleSheet } from 'react-native'
import { couleurs, espaces, rayons, polices, tailles, ombre, reliefBouton } from '../theme'

const styles = StyleSheet.create({
  carte: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaces.l,
    padding: espaces.l,
    borderRadius: rayons.grand,
    backgroundColor: couleurs.surface,
    borderWidth: 2,
    borderColor: 'transparent',
    marginBottom: espaces.m,
    ...ombre,
  },
  carteLegendaire: {
    borderColor: '#F7D27A',
    backgroundColor: '#FFFBF0',
  },
  infos: {
    flex: 1,
  },
  etiquetteLegendaire: {
    alignSelf: 'flex-start',
    backgroundColor: '#F7B731',
    borderRadius: rayons.rond,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 4,
  },
  texteEtiquetteLegendaire: {
    fontFamily: polices.titre,
    fontSize: 10,
    color: '#FFFFFF',
  },
  nom: {
    fontFamily: polices.tresGrasse,
    fontSize: tailles.moyenne,
    color: couleurs.texte,
  },
  univers: {
    fontFamily: polices.normale,
    fontSize: 13,
    color: couleurs.texteSecondaire,
    marginBottom: espaces.m,
  },
  boutons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaces.s,
  },
  boutonEclats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 38,
    paddingHorizontal: espaces.l,
    borderRadius: rayons.rond,
    backgroundColor: couleurs.principale,
    ...reliefBouton,
  },
  texteBoutonEclats: {
    fontFamily: polices.tresGrasse,
    fontSize: tailles.normale,
    color: couleurs.texteInverse,
  },
  boutonPub: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 38,
    paddingHorizontal: espaces.m,
    borderRadius: rayons.rond,
    backgroundColor: couleurs.principaleClaire,
  },
  texteBoutonPub: {
    fontFamily: polices.tresGrasse,
    fontSize: 14,
    color: couleurs.principaleFoncee,
  },
  mention: {
    fontFamily: polices.grasse,
    fontSize: 12,
    color: '#B5700A',
  },
})

export default styles
