import { StyleSheet } from 'react-native'
import { couleurs, espaces, rayons, polices, tailles, RATIO_CARTE } from '../theme'

const styles = StyleSheet.create({
  ecran: {
    flex: 1,
    backgroundColor: couleurs.fond,
  },
  entete: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: espaces.l,
    marginBottom: espaces.s,
  },
  boutonRetour: {
    width: 40,
    height: 40,
    borderRadius: rayons.rond,
    backgroundColor: couleurs.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titre: {
    fontFamily: polices.titre,
    fontSize: tailles.grande,
    color: couleurs.texte,
  },
  contenu: {
    paddingHorizontal: espaces.l,
    paddingBottom: espaces.xl,
  },
  titreSection: {
    fontFamily: polices.titre,
    fontSize: tailles.moyenne,
    color: couleurs.texte,
    marginTop: espaces.l,
    marginBottom: espaces.xs,
  },
  compteur: {
    color: couleurs.principale,
  },
  aide: {
    fontFamily: polices.normale,
    fontSize: 13,
    color: couleurs.texteSecondaire,
    marginBottom: espaces.s,
  },
  grille: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: espaces.s,
  },
  case: {
    width: '23%',
  },
  caseNonChoisie: {
    opacity: 0.55,
  },
  cadre: {
    width: '100%',
    aspectRatio: RATIO_CARTE,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'transparent',
  },
  cadreChoisi: {
    borderColor: couleurs.principale,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 24,
    height: 24,
    borderRadius: rayons.rond,
    backgroundColor: couleurs.principale,
    borderWidth: 2,
    borderColor: couleurs.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texteBadge: {
    fontFamily: polices.titre,
    fontSize: 12,
    color: couleurs.texteInverse,
  },
  ligneCombo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: espaces.s,
    backgroundColor: couleurs.surface,
    borderRadius: rayons.moyen,
    padding: espaces.m,
    marginBottom: espaces.s,
  },
  texteCombo: {
    flex: 1,
    fontFamily: polices.grasse,
    fontSize: 14,
    color: couleurs.texte,
  },
  pied: {
    paddingHorizontal: espaces.l,
    paddingTop: espaces.m,
    backgroundColor: couleurs.fond,
  },
  boutonEnregistrer: {
    height: 54,
    borderRadius: rayons.moyen,
    backgroundColor: couleurs.principale,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boutonDesactive: {
    opacity: 0.4,
  },
  texteEnregistrer: {
    fontFamily: polices.tresGrasse,
    fontSize: tailles.moyenne,
    color: couleurs.texteInverse,
  },
})

export default styles
