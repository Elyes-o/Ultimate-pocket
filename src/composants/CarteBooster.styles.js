import { StyleSheet } from 'react-native'
import { couleurs, espaces, rayons, polices, tailles } from '../theme'

const styles = StyleSheet.create({
  carte: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaces.m,
    padding: espaces.m,
    borderRadius: rayons.grand,
    backgroundColor: couleurs.surface,
    marginBottom: espaces.s,
  },
  carteVerrouillee: {
    opacity: 0.6,
  },
  infos: {
    flex: 1,
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
  },
  prix: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: espaces.m,
    height: 34,
    borderRadius: rayons.rond,
    backgroundColor: couleurs.principaleClaire,
  },
  textePrix: {
    fontFamily: polices.tresGrasse,
    fontSize: tailles.normale,
    color: couleurs.principaleFoncee,
  },
  bientot: {
    paddingHorizontal: espaces.m,
    height: 30,
    justifyContent: 'center',
    borderRadius: rayons.rond,
    backgroundColor: couleurs.surfaceDouce,
  },
  texteBientot: {
    fontFamily: polices.grasse,
    fontSize: 12,
    color: couleurs.texteSecondaire,
  },

})

export default styles
