import { StyleSheet } from 'react-native'
import { couleurs, espaces, rayons, polices, tailles } from '../theme'

const styles = StyleSheet.create({
  bandeau: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: espaces.l,
    paddingBottom: espaces.m,
    backgroundColor: couleurs.fond,
  },
  profil: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaces.s,
  },
  pseudo: {
    fontFamily: polices.tresGrasse,
    fontSize: tailles.normale,
    color: couleurs.texte,
  },
  lienProfil: {
    fontFamily: polices.normale,
    fontSize: tailles.petite,
    color: couleurs.texteSecondaire,
  },
  compteurs: {
    flexDirection: 'row',
    gap: espaces.s,
  },
  pastille: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 34,
    paddingLeft: 10,
    paddingRight: 4,
    borderRadius: rayons.rond,
    backgroundColor: couleurs.surface,
    borderWidth: 1,
    borderColor: couleurs.bordure,
    minWidth: 56,
  },
  nombre: {
    fontFamily: polices.tresGrasse,
    fontSize: tailles.normale,
    color: couleurs.texte,
    marginRight: 6,
  },
  boutonPlus: {
    width: 24,
    height: 24,
    borderRadius: rayons.rond,
    backgroundColor: couleurs.principale,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -2,
  },
})

export default styles
