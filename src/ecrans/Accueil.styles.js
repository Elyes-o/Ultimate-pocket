import { StyleSheet } from 'react-native'
import { couleurs, espaces, polices, tailles, ESPACE_BARRE_NAVIGATION } from '../theme'

const styles = StyleSheet.create({
  contenu: {
    paddingTop: espaces.xs,
    paddingBottom: ESPACE_BARRE_NAVIGATION,
  },
  section: {
    marginTop: espaces.xl,
  },
  sectionBoosters: {
    marginTop: espaces.xl,
    paddingHorizontal: espaces.l,
  },
  titreSection: {
    fontFamily: polices.titre,
    fontSize: tailles.grande,
    color: couleurs.texte,
    marginBottom: espaces.m,
    // Onglet de classeur : une languette Lagon à gauche du titre
    borderLeftWidth: 5,
    borderLeftColor: couleurs.principale,
    borderRadius: 3,
    paddingLeft: 10,
  },
})

export default styles
